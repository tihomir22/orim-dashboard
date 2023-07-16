import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, filter, firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean>;
  public user!: User;
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isAuthenticated$;
    this.auth.user$.pipe(filter((entry) => !!entry)).subscribe((data) => {
      this.user = data as User;
      this.http.post('http://localhost:1488/syncUser', this.user).subscribe();
    });
  }

  public login() {
    this.auth.loginWithPopup();
  }

  public logout() {
    this.auth.logout();
  }
}
