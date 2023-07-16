import { createReducer, on } from '@ngrx/store';
import { setAuthLoggedUser, setLoggedUserDB } from './user.actions';

export const initialUser = null;

export const userReducerAUTH0 = createReducer(
  initialUser,
  on(setAuthLoggedUser, (state, { auth0User }): any => auth0User)
);

export const userReducerDB = createReducer(
  initialUser,
  on(setLoggedUserDB, (state, { dbUser }): any => dbUser)
);
