import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User as UserAuth0 } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { HOST_BACKEND } from '../Coordinator';
import { UserDb } from '../models/user/user.model';
import {
  Link,
  WithdrawRequest,
} from '../platform/withdraw-status/withdraw-status.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public stats: { dynamic_key: string } = undefined as any;
  constructor(private http: HttpClient) {}

  public syncUser(user: UserAuth0): Observable<UserDb> {
    return this.http.post<UserDb>(HOST_BACKEND + 'syncUser', user);
  }

  public getStats(): Observable<{ dynamic_key: string }> {
    return this.http.get<{ dynamic_key: string }>(HOST_BACKEND + 'stats');
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

  public generateLink(email: string, type = 'DELETE_DATA', creator?: string) {
    return this.http.post(HOST_BACKEND + 'generateLink', {
      email,
      type,
      sub: creator,
    });
  }

  public executeLink(linkId: string, sub?: string) {
    return this.http.post(HOST_BACKEND + 'executeLink/' + linkId, { sub });
  }

  public getLinkToExecute(linkId: string) {
    return this.http.get<Link>(HOST_BACKEND + 'getGeneratedLink/' + linkId);
  }
  public generateReferralCode(sub: string) {
    return this.http.post(HOST_BACKEND + 'generate-referral-code', { sub });
  }
  public getReferralCode(sub: string) {
    return this.http.post(HOST_BACKEND + 'get-referral-code', { sub });
  }

  public activateReferralCodeManually(sub: string, code: string) {
    return this.http.post(HOST_BACKEND + 'activate-referral-manually', {
      sub,
      code,
    });
  }

  public getAmountRefered(sub: string): Observable<{ amount: number }> {
    return this.http.post(HOST_BACKEND + 'get-amount-referred-people', {
      sub,
    }) as any;
  }
  public isRecluted(sub: string): Observable<{ gotRecluted: boolean }> {
    return this.http.post(HOST_BACKEND + 'got-recluted', {
      sub,
    }) as any;
  }
  public getAchievements(sub: string) {
    return this.http.get(HOST_BACKEND + 'getAchievements/' + sub);
  }

  public getWithdrawStatus(email?: string, walletAddress?: string) {
    return this.http.post(HOST_BACKEND + 'findWithdraws', {
      email,
      walletAddress,
    });
  }

  public updateWithdraw(withdraw: WithdrawRequest) {
    return this.http.patch(
      HOST_BACKEND + 'withdraws' + `/${withdraw._id}`,
      withdraw
    );
  }
}
