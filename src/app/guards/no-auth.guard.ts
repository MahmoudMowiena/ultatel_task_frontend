import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    const router = inject(Router);
    router.navigateByUrl('/home');
    return false;
  }
  return true;
};
