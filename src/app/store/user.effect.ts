import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import { setAuthLoggedUser, setLoggedUserDB } from './user.actions';
import { AppState } from './model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { PossibleAuthRoles } from '../enums/user/user.enum';
import { UserDb } from '../models/user/user.model';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private user: UserService,
    private store: Store<AppState>,
    private router: Router,
    private auth: AuthService
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setAuthLoggedUser),
        switchMap((action) => {
          return this.user.syncUser(action.auth0User).pipe(
            map((entry) => {
              return [entry, action];
            })
          );
        }),
        tap((actionPackage) => {
          const [syncedUser, action] = actionPackage;
          this.store.dispatch(
            setLoggedUserDB({
              dbUser: syncedUser as UserDb,
              frameworkId: (action as any).frameworkId,
            })
          );
        }),
        ignoreElements()
      ) as any
  );

  redirectAfterDbLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setLoggedUserDB),
        switchMap((action) => {
          return this.auth.appState$.pipe(map((entry) => [entry, action]));
        }),
        switchMap((incomingParams) => {
          let [auth0State, action] = incomingParams;
          let actionParsed = action as any;
          let auth0StateParsed = auth0State as {
            unity: boolean;
            frameworkId: string;
          };
          if (auth0StateParsed.unity) {
            this.user
              .closeLoginFramework(
                auth0StateParsed.frameworkId ?? '',
                actionParsed.dbUser.sub
              )
              .subscribe(() =>
                this.router.navigate(['/unity/success-message-login'])
              );
          } else {
            switch (actionParsed.dbUser.role_code as PossibleAuthRoles) {
              case PossibleAuthRoles.PLAYER:
                console.log('Redirecting to player');
                this.router.navigate(['/']);
                break;

              case PossibleAuthRoles.ADMIN:
                console.log('Redirecting to admin');
                this.router.navigate(['/admin']);
                break;

              default:
                return false;
            }
          }
          return of(null) as any;
        }),

        ignoreElements()
      ) as any
  );
}
