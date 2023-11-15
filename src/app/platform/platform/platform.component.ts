import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, filter } from 'rxjs';
import { AppState } from 'src/app/store/model';
import { setAuthLoggedUser } from 'src/app/store/user.actions';
import { UserService } from 'src/app/store/user.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean>;
  public user!: User;
  public isSidebarOpened = signal(true);
  public routesNavigation = [
    {
      path: '/',
      displayText: 'Home',
      icon: 'fa fa-home',
    },
    {
      path: '/progress',
      displayText: 'Game progress',
      icon: 'fa fa-solid fa-bars-progress',
    },
    {
      path: '/referral',
      displayText: 'Referral',
      icon: 'fa fa-gears',
    },
    {
      path: '/options',
      displayText: 'Options',
      icon: 'fa fa-gears',
    },
  ];

  constructor(
    private auth: AuthService,
    public router: Router,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    public userService: UserService
  ) {}

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

  public toggleSidebarOpened(): void {
    this.isSidebarOpened.update((currentValue) => !currentValue);
  }
}
