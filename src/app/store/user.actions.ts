import { User as Auth0 } from '@auth0/auth0-angular';
import { createAction, props } from '@ngrx/store';
import { UserDb } from '../models/user/user.model';

export const setAuthLoggedUser = createAction(
  '[user] Set loaded user from Auth0 to Store',
  props<{ auth0User: Auth0; frameworkId?: string }>()
);

export const setLoggedUserDB = createAction(
  '[user] Set loaded user from DB to Store',
  props<{ dbUser: UserDb; frameworkId?: string }>()
);

