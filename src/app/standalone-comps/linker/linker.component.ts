import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/store/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-linker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linker.component.html',
  styleUrls: ['./linker.component.scss'],
})
export class LinkerComponent {
  public modalService = inject(NgbModal);

  constructor(
    private route: ActivatedRoute,
    private user: UserService,
    private toast: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.executeLink();
  }

  private async executeLink() {
    const linkId = this.route.snapshot.paramMap.get('id');
    try {
      const link = await firstValueFrom(
        this.user.getLinkToExecute(linkId ?? '')
      );
      switch (link.type) {
        case 'DELETE_DATA':
          await this.executeDeleteDataLink();
          break;

        case 'REFERRAL_CODE':
          await this.executeReferralDataLink();
          break;

        case 'VERIFY_EMAIL':
          await this.executeVerifyEmailLink();
          break;

        default:
          this.toast.error('Link was not found. Contact with admin.');
          break;
      }
    } catch (error: any) {
      this.toast.error('An unexpected error happened. Contact with admin.');
      if (error.message) {
        this.toast.error(error.error.message);
      }
    }
  }

  private async executeDeleteDataLink() {
    const linkId = this.route.snapshot.paramMap.get('id');
    try {
      const executed = (await firstValueFrom(
        this.executeLink$(linkId ?? '')
      )) as any;
      this.toast.success(executed.message);
      this.auth.logout();
    } catch (error) {
      this.toast.error('An unexpected error happened. Contact with admin.');
    }
  }

  private async executeVerifyEmailLink() {
    const linkId = this.route.snapshot.paramMap.get('id');
    try {
      const executed = (await firstValueFrom(
        this.executeLink$(linkId ?? '')
      )) as any;
      this.displayModalSuccessfulVerification();
      setTimeout(() => {
        window.location.assign('https://orimgames.com/');
      }, 7000);
    } catch (error) {
      this.toast.error('An unexpected error happened. Contact with admin.');
    }
  }

  public async displayModalSuccessfulVerification() {
    const modalRef = this.modalService.open(DialogComponent, {
      centered: true,
    });
    (modalRef.componentInstance as DialogComponent).title.set(
      'Email confirmed successfully'
    );
    (modalRef.componentInstance as DialogComponent).displayCloseButton = false;
    (modalRef.componentInstance as DialogComponent).displayFooter = false;
    (modalRef.componentInstance as DialogComponent).description.set(
      `
      Great news, Your email has been successfully verified. You can now close this window. In 10 seconds, you will be redirected to our official website, orimgames.com. \n

      You can now go and open any withdrawal request you want! \n

      Thank you for choosing Orim Games. We look forward to providing you with exciting gaming experiences and exclusive content. If you have any questions, feel free to reach out to our support team. \n

      Happy gaming!

      `
    );
  }

  private async executeReferralDataLink() {
    const linkId = this.route.snapshot.paramMap.get('id');
    const isLoggedIn = await firstValueFrom(this.auth.isAuthenticated$);
    if (isLoggedIn) {
      const executed = (await firstValueFrom(
        this.executeLink$(linkId ?? '')
      )) as any;
      this.toast.success(executed.message);
      this.router.navigate(['/']);
    } else {
      this.toast.info(
        'You have to login or sign up in order to execute this referral link.'
      );
      this.auth.loginWithRedirect({
        appState: { urlToRedirect: this.router.url },
      });
    }
  }

  private executeLink$(linkId: string) {
    return this.auth.user$.pipe(
      switchMap((user) => {
        return this.user.executeLink(linkId ?? '', user?.sub);
      })
    );
  }
}
