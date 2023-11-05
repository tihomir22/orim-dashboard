import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, filter, firstValueFrom } from 'rxjs';
import { AppState } from 'src/app/store/model';
import { setAuthLoggedUser } from 'src/app/store/user.actions';
@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean>;
  public user!: User;
  constructor(
    private auth: AuthService,
    public router: Router,
    private http: HttpClient,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.isLoggedIn$ = this.auth.isAuthenticated$;
    this.auth.user$.pipe(filter((entry) => !!entry)).subscribe((data) => {
      this.user = data as User;
      this.store.dispatch(setAuthLoggedUser({ auth0User: this.user }));
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }

  public login() {
    this.auth.loginWithPopup();
  }

  public logout() {
    this.auth.logout();
  }

  public navigateToOptions() {
    this.router.navigate(['/options']);
  }
}
