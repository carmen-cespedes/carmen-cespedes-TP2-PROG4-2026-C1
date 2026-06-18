import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.usuarioActual()?.perfil === 'administrador') {
    return true;
  }

  router.navigateByUrl('/publicaciones');
  return false;
};