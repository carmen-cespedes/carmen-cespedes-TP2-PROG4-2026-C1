import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { resource } from '@angular/core';
import { Auth } from '../../auth/auth';
import { PublicacionesService } from '../../publicaciones/publicaciones';
import { UsuariosService } from '../../usuarios/usuarios';
import { FechaRelativaPipe } from '../../pipes/fecha-relativa-pipe';
import { PrimeraLetraMayusculaPipe } from '../../pipes/primera-letra-mayuscula-pipe';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FechaRelativaPipe, PrimeraLetraMayusculaPipe],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil {
  authService = inject(Auth);
  publicacionesService = inject(PublicacionesService);
  usuariosService = inject(UsuariosService);

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
    } catch (e) {
      console.error('Error al cambiar foto');
    }
  }
}