import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { filter, firstValueFrom } from 'rxjs';
import { AppState } from 'src/app/store/model';
import { setAuthLoggedUser } from 'src/app/store/user.actions';

@Component({
  selector: 'app-autologin',
  templateUrl: './autologin.component.html',
  styleUrls: ['./autologin.component.scss'],
})
export class AutologinComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tryToLogin();
    const frameworkId = this.route.snapshot.paramMap.get('frameworkId');
    this.auth.user$.pipe(filter((entry) => !!entry)).subscribe((data) => {
      this.store.dispatch(
        setAuthLoggedUser({
          auth0User: data as User,
          frameworkId: frameworkId ?? '',
        })
      );
    });
  }

  public async tryToLogin() {
    const frameworkId = this.route.snapshot.paramMap.get('frameworkId');
    const isLoggedIn = await firstValueFrom(this.auth.isAuthenticated$);
    if (!isLoggedIn) {
      this.auth.loginWithRedirect({
        appState: {
          unity: true,
          frameworkId,
        },
      });
    }
  }
}
