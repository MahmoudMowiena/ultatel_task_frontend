import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined') { // Ensure code runs only in browser
    const token = localStorage.getItem('token');
    if (token) {
      const router = inject(Router);
      router.navigateByUrl('/home');
      return false;
    }
  }
  return true;
};
