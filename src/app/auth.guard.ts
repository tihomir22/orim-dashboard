import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  return auth.isAuthenticated$.pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/']);
        toast.error('You are not logged in!');
      }
    })
  );
};
