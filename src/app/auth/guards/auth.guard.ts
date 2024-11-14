import { inject } from "@angular/core";

import { Router, type CanActivateFn } from "@angular/router";

import { catchError, first, map, Observable, of, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus().pipe(
    first(),
    tap((isAuth) => isAuth),
  );
};

const isNotAuthenticateGuard: CanActivateFn = (route, state) => {
  return isNotAuthenticated().pipe(
    first(),
    tap((isNotAuth) => isNotAuth),
  );
};

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(["./auth/login"]);
        return false;
      } else {
        return true;
      }
    }),
    catchError(() => {
      router.navigate(["./auth/login"]);
      return of(false);
    })
  );
};

const isNotAuthenticated = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        console.info('isAuthenticated: ', isAuthenticated);
        router.navigate(["./heroes/list"]);
        return false;
      };
      return true;
    }),
    catchError(() => {
      return of(true);
    })
  );
};

export { isAuthenticatedGuard, isNotAuthenticateGuard };

