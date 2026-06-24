import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { resource } from '@angular/core';
import { Auth } from '../../auth/auth';
import { PublicacionesService } from '../../publicaciones/publicaciones';
import { UsuariosService } from '../../usuarios/usuarios';
import { FechaRelativaPipe } from '../../pipes/fecha-relativa-pipe';
import { ResaltarDirective } from '../../directives/resaltar';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FechaRelativaPipe, ResaltarDirective],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil {
  authService = inject(Auth);
  publicacionesService = inject(PublicacionesService);
  usuariosService = inject(UsuariosService);
  cdr = inject(ChangeDetectorRef);

  usuario = this.authService.usuarioActual;

  publicacionesResource = resource({
    params: () => ({ id: this.usuario()?._id, token: this.authService.getToken() }),
    loader: ({ params }) => 
      params.id && params.token 
        ? this.publicacionesService.listarPorUsuarioConToken(params.id, params.token)
        : Promise.resolve([])
  });

  async cambiarFoto(event: any) {
    const foto = event.target.files[0];
    if (!foto) return;
    try {
      const usuario = await this.usuariosService.actualizarFoto(foto);
      this.authService.usuarioActual.set(usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.cdr.detectChanges();
    } catch (e: any) {
      console.error('Error al cambiar foto', e);
      console.error('Status:', e.status);
      console.error('Message:', e.message);
      this.cdr.detectChanges();
    }
  }
}