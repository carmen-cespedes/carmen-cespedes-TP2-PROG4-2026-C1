import { Component, inject, signal, resource, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { UsuariosService } from '../../usuarios/usuarios';
import { PrimeraLetraMayusculaPipe } from '../../pipes/primera-letra-mayuscula-pipe';
import { DeshabilitarSiDirective } from '../../directives/deshabilitar-si';
import { TooltipDirective } from '../../directives/tooltip';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimeraLetraMayusculaPipe, DeshabilitarSiDirective, TooltipDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  authService = inject(Auth);
  usuariosService = inject(UsuariosService);
  cdr = inject(ChangeDetectorRef);

  error = signal('');
  mostrarFormulario = signal(false);

  nuevoUsuario = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    descripcion: '',
    email: '',
    nombreUsuario: '',
    contrasena: '',
    perfil: 'usuario'
  };

  usuariosResource = resource({
    params: () => ({ token: this.authService.getToken() }),
    loader: () => this.usuariosService.listar()
  });

  async deshabilitar(id: string) {
    try {
      await this.usuariosService.deshabilitar(id);
      this.usuariosResource.reload();
      this.cdr.detectChanges();
    } catch (e: any) {
      this.error.set('Error al deshabilitar usuario.');
    }
  }

  async habilitar(id: string) {
    try {
      await this.usuariosService.habilitar(id);
      this.usuariosResource.reload();
      this.cdr.detectChanges();
    } catch (e: any) {
      this.error.set('Error al habilitar usuario.');
    }
  }

  async crearUsuario() {
    try {
      await this.usuariosService.crear(this.nuevoUsuario);
      this.usuariosResource.reload();
      this.mostrarFormulario.set(false);
      this.cdr.detectChanges();
      this.nuevoUsuario = {
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        descripcion: '',
        email: '',
        nombreUsuario: '',
        contrasena: '',
        perfil: 'usuario'
      };
    } catch (e: any) {
      this.error.set('Error al crear usuario.');
    }
  }
}