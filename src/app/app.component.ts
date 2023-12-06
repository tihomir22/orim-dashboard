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

  private alreadyRedirected = new Set([] as Array<string>);

  constructor(
    private auth: AuthService,
    private router: Router,
    private user: UserService
  ) {
    this.auth.appState$.subscribe((data) => {
      const dataParsed = data as { urlToRedirect: string };
      if (
        !!dataParsed.urlToRedirect &&
        !this.alreadyRedirected.has(dataParsed.urlToRedirect)
      ) {
        setTimeout(() => {
          this.router.navigate([dataParsed.urlToRedirect]);
          this.alreadyRedirected.add(dataParsed.urlToRedirect);
        }, 1000);
      }
    });
    this.user.getStats().subscribe((data) => (this.user.stats = data));
  }
}
