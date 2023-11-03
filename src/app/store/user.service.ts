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

  public closeLoginFramework(frameworkId: string, userSub: string) {
    return this.http.post<void>(
      HOST_BACKEND + 'login/closeLoginFramework/' + frameworkId,
      { userSub }
    );
  }

  public getLoginFrameworkFromSub(sub: string) {
    return this.http.get(HOST_BACKEND + 'login/getUnityId/' + sub);
  }

  public generateLink(email: string) {
    return this.http.post(HOST_BACKEND + 'generateLink', { email });
  }

  public executeLink(linkId: string) {
    return this.http.post(HOST_BACKEND + 'executeLink/' + linkId, {});
  }
}
