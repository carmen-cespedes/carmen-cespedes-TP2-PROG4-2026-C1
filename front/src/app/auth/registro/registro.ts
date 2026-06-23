import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';
import { IRegistro } from '../auth.interfaces';
import { ContieneNumeroPipe } from '../../pipes/contiene-numero-pipe';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, ContieneNumeroPipe],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  authService = inject(Auth);
  cargando = signal(false);
  error = signal ('');
  fotoArchivo: File | undefined;

  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nombreUsuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contrasena: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/[0-9]/),
    ]),
  });

  onFotoSeleccionada(event: any) {
    this.fotoArchivo = event.target.files[0];
  }

  async registrar() {
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.cargando.set(true);
    this.error.set('');
    try {
      await this.authService.registrar(this.formulario.value as IRegistro, this.fotoArchivo);
    } catch (e: any) {
      if (e.status === 409) {
        const mensaje = e.error?.message;
        if (mensaje?.includes('email')) {
          this.error.set('El email ya está registrado.');
        } else if (mensaje?.includes('usuario')) {
          this.error.set('El nombre de usuario ya está en uso.');
        } else {
          this.error.set('Ya existe un usuario con esos datos.');
        }
      } else {
        this.error.set('Ocurrió un error al registrarse. Intentá de nuevo.');
      }
    } finally {
      this.cargando.set(false);
    }
  }
}