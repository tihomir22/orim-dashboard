import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { AppState } from './model';
import { userReducerAUTH0, userReducerDB } from './user.reducer';

export const reducers: ActionReducerMap<AppState> = {
  userLoggedAuth0: userReducerAUTH0 as any,
  userLoggedDB: userReducerDB as any,
};

export const initialAppState: AppState = {
  userLoggedAuth0: null as any,
  userLoggedDB: null as any,
};
