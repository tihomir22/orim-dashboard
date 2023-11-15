import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './store/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'orim-dashboard';

  constructor(
    private auth: AuthService,
    private router: Router,
    private user: UserService
  ) {
    this.auth.appState$.subscribe((data) => console.log(data));
    this.user.getStats().subscribe((data) => (this.user.stats = data));
  }
}
