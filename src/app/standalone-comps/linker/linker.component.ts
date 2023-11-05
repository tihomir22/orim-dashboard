import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/store/user.service';
import { link } from 'ngx-bootstrap-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-linker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linker.component.html',
  styleUrls: ['./linker.component.scss'],
})
export class LinkerComponent {
  constructor(
    private route: ActivatedRoute,
    private user: UserService,
    private router: Router,
    private toast: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const linkId = this.route.snapshot.paramMap.get('id');
    this.auth.user$
      .pipe(
        switchMap((user) => {
          return this.user.executeLink(linkId ?? '', user?.sub);
        })
      )
      .subscribe(
        (data: any) => {
          this.toast.success(data.message);
          if (data.type == 'DELETE_DATA') {
            this.auth.logout();
          }
          this.router.navigate(['/']);
        },
        (error) => {
          this.toast.error(error.error.message);
          this.router.navigate(['/']);
          this.auth.loginWithPopup();
        }
      );
  }
}
