import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, map, switchMap } from 'rxjs';
import { UserService } from 'src/app/store/user.service';
import { getImgSrcBasedOnGameName } from 'src/app/utils';
export interface Progress {
  _id: string;
  game: string;
  sub: string;
  playerPrefsAsProgress: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface GameConditions {
  text: string;
  key: string;
  condition: 'gt' | 'gte';
  value: number;
}
export interface GameRules {
  conditionType: 'OR' | 'AND';
  conditions: Array<GameConditions>;
}
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  public gameProgresses$ = this.auth.user$.pipe(
    switchMap((entry) => {
      return this.userService.getAchievements(entry?.sub ?? '') as Observable<
        Progress[]
      >;
    })
  ) as Observable<
    Array<Progress & { rule: GameRules; processed_rule: [boolean] }>
  >;
  constructor(private userService: UserService, private auth: AuthService) {}

  public getImgSrcBasedOnGameName(gameName: string) {
    return getImgSrcBasedOnGameName(gameName);
  }
}
