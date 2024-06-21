import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import * as jwtdecode from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = `Bearer ${localStorage.getItem("token")}`;

  if (token != "Bearer null") {
    const payload: { exp: number } = jwtdecode.jwtDecode(token);

    if (Math.floor(Date.now() / 1000) > payload.exp) {
      const router = inject(Router);
      localStorage.removeItem('token');
      router.navigate(['/login']);
    }
  }

  let modifiedRequest = req.clone({
    setHeaders: {
      Authorization: token
    }
  })
  return next(modifiedRequest);
};
