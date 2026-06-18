import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Auth } from '../auth/auth';


@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  private http = inject(HttpClient);
  private authService = inject(Auth);

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  async listar(orden: string = 'fecha', offset: number = 0, limit: number = 10) {
    return firstValueFrom(
      this.http.get<any[]>(`${environment.apiUrl}/publicaciones?orden=${orden}&offset=${offset}&limit=${limit}`, {
        headers: this.getHeaders(),
      })
    );
  }

  async crear(datos: { titulo: string; descripcion: string }, imagen?: File) {
    const formData = new FormData();
    formData.append('titulo', datos.titulo);
    formData.append('descripcion', datos.descripcion);
    if (imagen) formData.append('imagen', imagen);

    return firstValueFrom(
      this.http.post<any>(`${environment.apiUrl}/publicaciones`, formData, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.getToken()}`,
        }),
      })
    );
  }

  async eliminar(id: string) {
    return firstValueFrom(
      this.http.delete<any>(`${environment.apiUrl}/publicaciones/${id}`, {
        headers: this.getHeaders(),
      })
    );
  }

  async darMeGusta(id: string) {
    return firstValueFrom(
      this.http.post<any>(`${environment.apiUrl}/publicaciones/${id}/me-gusta`, {}, {
        headers: this.getHeaders(),
      })
    );
  }

  async quitarMeGusta(id: string) {
    return firstValueFrom(
      this.http.delete<any>(`${environment.apiUrl}/publicaciones/${id}/me-gusta`, {
        headers: this.getHeaders(),
      })
    );
  }

  async listarPorUsuario(usuarioId: string) {
    return firstValueFrom(
      this.http.get<any[]>(`${environment.apiUrl}/publicaciones?usuarioId=${usuarioId}&limit=3`, {
        headers: this.getHeaders(),
      })
    );
  }

  listarPorUsuarioObservable(usuarioId: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/publicaciones?usuarioId=${usuarioId}&limit=3`, {
      headers: this.getHeaders(),
    });
  }

  async listarPorUsuarioConToken(usuarioId: string, token: string) {
  return firstValueFrom(
    this.http.get<any[]>(`${environment.apiUrl}/publicaciones?usuarioId=${usuarioId}&limit=3`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    })
  );
}

  async listarConToken(orden: string = 'fecha', token: string, offset: number = 0, limit: number = 10) {
    return firstValueFrom(
      this.http.get<any[]>(`${environment.apiUrl}/publicaciones?orden=${orden}&offset=${offset}&limit=${limit}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
    );
  }

  
}

