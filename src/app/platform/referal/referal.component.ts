import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import {
  combineLatest,
  firstValueFrom,
  forkJoin,
  map,
  merge,
  of,
  subscribeOn,
  switchMap,
} from 'rxjs';
import { HOST_BACKEND, HOST_WEBAPP } from 'src/app/Coordinator';
import { UserService } from 'src/app/store/user.service';
import { copyTextToClipboard, sendEmailTo } from 'src/app/utils';

@Component({
  selector: 'app-referal',
  templateUrl: './referal.component.html',
  styleUrls: ['./referal.component.scss'],
})
export class ReferalComponent {
  public ownReferralCode = signal(null as any);
  public formGroup!: FormGroup;
  gaugeType = 'semi' as any;
  gaugeLabel = 'Speed';
  gaugeAppendText = 'km/hr';
  public amountRefered$ = this.auth.user$.pipe(
    switchMap((entry) => {
      return this.user
        .getAmountRefered(entry?.sub ?? '')
        .pipe(map((entry) => entry.amount));
    })
  );
  public isRecluted$ = this.auth.user$.pipe(
    switchMap((entry) => {
      return this.user
        .isRecluted(entry?.sub ?? '')
        .pipe(map((entry) => entry.gotRecluted));
    })
  );
  totalBonus = combineLatest([this.amountRefered$, this.isRecluted$]).pipe(
    switchMap((entry) => {
      const [amount, isRecluted] = entry;
      return of(amount + (isRecluted ? 1 : 0));
    })
  );

  constructor(
    private user: UserService,
    private auth: AuthService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.auth.user$
      .pipe(
        switchMap((entry) => {
          return this.user.getReferralCode(entry?.sub ?? '');
        })
      )
      .subscribe((data: any) => {
        const parsed = data as { code: string };
        this.ownReferralCode.set(parsed.code);
      });

    this.formGroup = this.fb.group({
      sendEmail: ['', [Validators.required, Validators.email]],
    });
  }

  public async generateCode() {
    const user = await firstValueFrom(this.auth.user$);
    const code = (await firstValueFrom(
      this.user.generateReferralCode(user?.sub ?? '')
    )) as { code: string };
    this.ownReferralCode.set(code.code);
  }

  public copyReferal() {
    copyTextToClipboard(this.ownReferralCode());
    this.toast.info('Copied to clipboard');
  }

  public async sendMailTo() {
    const sub = await firstValueFrom(
      this.auth.user$.pipe(map((entry) => entry?.sub))
    );
    const generatedLink = (await firstValueFrom(
      this.user.generateLink(
        this.formGroup.controls['sendEmail'].value,
        'REFERRAL_CODE',
        sub
      )
    )) as any;
    sendEmailTo(
      this.formGroup.controls['sendEmail'].value,
      'Join the Fun and Earn Money Playing with Orim Games!',
      `Hello friend,

    I hope this message finds you well. I am thrilled to share some exciting news with you! I've recently become a part of Orim Games, an incredible gaming platform where you can play and earn money simultaneously.

    Orim Games offers a unique gaming experience, packed with excitement and enjoyment. I cordially invite you to join our community of passionate gamers and dive into the world of games while making real money.

    By joining through my invitation, you'll gain access to a fantastic benefit: a lifelong 1% increase on all your cryptocurrency withdrawals! It's an incredible opportunity to maximize your earnings while having a blast.

    To get started, simply click on this special link: ${
      HOST_WEBAPP + 'REFERRAL_CODE/' + generatedLink.linkId
    }

    I am confident that you'll love the gaming experience at Orim Games just as much as I do. Feel free to reach out if you have any questions or need assistance getting started.

    Looking forward to seeing you soon in the world of Orim Games! Let's play and win together!

    Warm regards,`
    );
  }
}
