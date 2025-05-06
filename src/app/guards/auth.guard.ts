import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.getCurrentUser();
  return user ? true : router.createUrlTree(['/login']);
};
