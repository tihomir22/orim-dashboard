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

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private user: UserService,
    private store: Store<AppState>,
    private router: Router
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
              isUnityModule: (action as any).isUnityModule,
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
          if (action.isUnityModule) {
            this.user
              .closeLoginFramework(action.frameworkId ?? '', action.dbUser.sub)
              .subscribe(() =>
                this.router.navigate(['/unity/success-message-login'])
              );
          } else {
            switch (action.dbUser.role_code as PossibleAuthRoles) {
              case PossibleAuthRoles.PLAYER:
                this.router.navigate(['/']);
                break;

              case PossibleAuthRoles.ADMIN:
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
