import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';
import { ILogin } from '../auth.interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(Auth);
  cdr = inject(ChangeDetectorRef);
  cargando = false;
  error = '';

  formulario = new FormGroup({
    identifier: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  async ingresar() {
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.cargando = true;
    this.error = '';
    try {
      await this.authService.ingresar(this.formulario.value as ILogin);
    } catch (e: any) {
      console.log('error completo:', e);
      console.log('e.error:', e.error);
      console.log('e.error.message:', e.error?.message);
      if (e.status === 401) {
        const mensaje = e.error?.message;
        if (mensaje === 'cuenta-deshabilitada' || e.error?.message === 'cuenta-deshabilitada') { 
          this.error = 'Tu cuenta está deshabilitada. Contactá al administrador.';
        } else {
          this.error = 'Usuario o contraseña incorrectos.';
        }
      } else {
        this.error = 'Ocurrió un error. Intentá de nuevo.';
      }
      this.cdr.detectChanges();
    }
  }
}