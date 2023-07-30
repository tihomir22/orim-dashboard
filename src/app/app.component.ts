import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'orim-dashboard';

  constructor(private auth: AuthService, private router: Router) {
    this.auth.appState$.subscribe((data) => console.log(data));
  }
}
