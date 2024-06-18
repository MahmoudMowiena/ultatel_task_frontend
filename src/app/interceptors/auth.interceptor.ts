import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  let modifiedRequest = req.clone({
    setHeaders: {
      Authorization: token
    }
  })
  return next(modifiedRequest);
};
