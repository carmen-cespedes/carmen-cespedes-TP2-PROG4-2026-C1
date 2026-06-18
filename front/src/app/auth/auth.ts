import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILogin, IRegistro, IUsuario } from './auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);

  sesionIniciada = new Subject<void>();
  usuarioActual = signal<IUsuario | null>(null);

  constructor() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioActual.set(JSON.parse(usuarioGuardado));
    }
  }

  async registrar(datos: IRegistro, foto?: File): Promise<void> {
    const formData = new FormData();
    Object.entries(datos).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value);
    });
    if (foto) formData.append('fotoPerfil', foto);

    const response: any = await firstValueFrom(
      this.http.post(`${environment.apiUrl}/autenticacion/registro`, formData)
    );

    localStorage.setItem('token', response.token);
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    this.usuarioActual.set(response.usuario);
    this.sesionIniciada.next();
    this.router.navigateByUrl('/publicaciones');
  }

  async ingresar(datos: ILogin): Promise<void> {
    const response: any = await firstValueFrom(
      this.http.post(`${environment.apiUrl}/autenticacion/ingresar`, datos)
    );

    localStorage.setItem('token', response.token);
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    this.usuarioActual.set(response.usuario);
    this.sesionIniciada.next();
    this.router.navigateByUrl('/publicaciones');
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioActual.set(null);
    this.router.navigateByUrl('/login');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}