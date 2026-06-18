import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { resource } from '@angular/core';
import { Auth } from '../../auth/auth';
import { PublicacionesService } from '../../publicaciones/publicaciones';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil {
  authService = inject(Auth);
  publicacionesService = inject(PublicacionesService);

  usuario = this.authService.usuarioActual;

  publicacionesResource = resource({
    params: () => ({ id: this.usuario()?._id, token: this.authService.getToken() }),
    loader: ({ params }) => 
      params.id && params.token 
        ? this.publicacionesService.listarPorUsuarioConToken(params.id, params.token)
        : Promise.resolve([])
  });
}