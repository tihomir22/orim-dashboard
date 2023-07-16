import { User as UserAuth0 } from '@auth0/auth0-angular';
import { UserDb } from '../models/user/user.model';

export interface AppState {
  userLoggedAuth0: UserAuth0;
  userLoggedDB: UserDb;
}
