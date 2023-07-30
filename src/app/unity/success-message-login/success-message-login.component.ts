import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-success-message-login',
  templateUrl: './success-message-login.component.html',
  styleUrls: ['./success-message-login.component.scss'],
})
export class SuccessMessageLoginComponent implements OnInit {
  constructor(private toastr: ToastrService, public auth: AuthService) {}

  ngOnInit(): void {}

  public closeLoginAndReturnToUnity(): void {
    this.toastr.info('Close the window', 'You can return to the game now', {});
    window.close(); // Cierra la ventana actual
  }
}
