import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User as UserAuth0 } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { HOST_BACKEND } from '../Coordinator';
import { UserDb } from '../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public syncUser(user: UserAuth0): Observable<UserDb> {
    return this.http.post<UserDb>(HOST_BACKEND + 'syncUser', user);
  }
}
