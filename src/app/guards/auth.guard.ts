import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token");
  if(token == null) {
    const router = inject(Router);
    router.navigateByUrl("/login");
    return false;
  }
  return true;
};
