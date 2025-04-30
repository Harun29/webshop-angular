import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.getCurrentUser().pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    })
  );
};
