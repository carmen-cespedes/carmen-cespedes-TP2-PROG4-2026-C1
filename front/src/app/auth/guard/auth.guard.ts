import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Auth } from '../auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  authService = inject(Auth);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getToken()) {
      return true; // ← si hay token, dejá pasar
    }
    this.router.navigate(['/cargando'], { queryParams: { redirect: state.url } });
    return false;
  }
}
