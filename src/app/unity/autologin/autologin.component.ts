import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-autologin',
  templateUrl: './autologin.component.html',
  styleUrls: ['./autologin.component.scss'],
})
export class AutologinComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.tryToLogin();

  }

  public async tryToLogin() {
    const isLoggedIn = await firstValueFrom(this.auth.isAuthenticated$);
    if (!isLoggedIn) {
      this.auth.loginWithRedirect();
    }
  }
}
