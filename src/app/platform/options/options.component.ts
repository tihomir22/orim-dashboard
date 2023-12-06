import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import {
  DialogComponent,
  TYPE_DIALOG,
} from 'src/app/standalone-comps/dialog/dialog.component';
import { UserService } from 'src/app/store/user.service';
import { esEmail } from 'src/app/utils';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {
  public authService = inject(AuthService);
  public modalService = inject(NgbModal);
  public unityId!: string;
  public toastService = inject(ToastrService);
  public userService = inject(UserService);
  constructor() {}
  ngOnInit(): void {}

  public async deleteAccountData() {
    const modalRef = this.modalService.open(DialogComponent);
    (modalRef.componentInstance as DialogComponent).title.set('Confirmation');
    (modalRef.componentInstance as DialogComponent).description.set(
      'Are you sure you want to delete all your account data?'
    );
    (modalRef.componentInstance as DialogComponent).confirmText.set('Confirm');
    (modalRef.componentInstance as DialogComponent).placeholderInput.set(
      'Input your email'
    );
    (modalRef.componentInstance as DialogComponent).type.set(TYPE_DIALOG.INPUT);
    const user = await firstValueFrom(this.authService.user$);
    if (user) {
      (modalRef.componentInstance as DialogComponent).valueInput =
        user.email ?? '';
    }
    modalRef.result.then(async (res: Array<string>) => {
      const [email] = res;
      if (esEmail(email)) {
        this.toastService.info(
          'You will receive an email containing the confirmation link!'
        );
        const res = await firstValueFrom(this.userService.generateLink(email));
      } else {
        this.toastService.error('You did not introduce an email!');
      }
    });
  }
}
