import { Routes } from '@angular/router';
import { adminGuard } from './guard/admin-guard';
import { AuthGuard } from './auth/guard/auth.guard';
import { PublicGuard } from './guard/public-guard';

export const routes: Routes = [

  {
    path: '', redirectTo: 'cargando', pathMatch: 'full', 
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(a => a.Login),
    canActivate: [PublicGuard]
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/registro/registro').then(a => a.Registro),
    canActivate: [PublicGuard]
  },
  {
    path: 'publicaciones',
    loadComponent: () => import('./pages/publicaciones/publicaciones').then(a => a.Publicaciones),
    canActivate: [AuthGuard]
  },
  {
    path: 'mi-perfil',
    loadComponent: () => import('./pages/mi-perfil/mi-perfil').then(a => a.MiPerfil),
    canActivate: [AuthGuard]
  },

  {
    path: 'publicacion/:id',
    loadComponent: () => import('./pages/publicacion/publicacion').then(a => a.Publicacion),
    canActivate: [AuthGuard]
  },

  {
    path: 'cargando',
    loadComponent: () => import('./pages/cargando/cargando').then(a => a.Cargando),
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(a => a.Dashboard),
    canActivate: [adminGuard]
  },

  {
    path: 'estadisticas',
    loadComponent: () => import('./pages/estadisticas/estadisticas').then(a => a.Estadisticas),
    canActivate: [adminGuard]
  },
  
  { path: '**', redirectTo: 'cargando' }
];