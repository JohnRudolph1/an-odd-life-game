// FILE: src/app/guards/auth.guard.ts
// Dependencies: Uses AuthService to determine sign-in state; referenced by AppRoutingModule to protect routes.

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.authState$.pipe(
      take(1),
      map((user) =>
        user ? true : this.router.createUrlTree(['/login'], { queryParams: { redirectTo: state.url } })
      )
    );
  }
}
