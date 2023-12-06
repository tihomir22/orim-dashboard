import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/store/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-linker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linker.component.html',
  styleUrls: ['./linker.component.scss'],
})
export class LinkerComponent {
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
