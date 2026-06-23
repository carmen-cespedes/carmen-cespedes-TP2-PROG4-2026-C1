import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../auth/auth';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
  authService = inject(Auth);
  router = inject(Router);

  canActivate(): boolean {
    if (this.authService.getToken()) {
      this.router.navigateByUrl('/publicaciones');
      return false;
    }
    return true;
  }
}