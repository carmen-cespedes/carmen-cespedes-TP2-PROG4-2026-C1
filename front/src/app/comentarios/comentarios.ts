import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private http = inject(HttpClient);
  private authService = inject(Auth);

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  async listar(publicacionId: string, offset: number = 0, limit: number = 5) {
    return firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiUrl}/publicaciones/${publicacionId}/comentarios?offset=${offset}&limit=${limit}`,
        { headers: this.getHeaders() }
      )
    );
  }

  async crear(publicacionId: string, mensaje: string) {
    return firstValueFrom(
      this.http.post<any>(
        `${environment.apiUrl}/publicaciones/${publicacionId}/comentarios`,
        { mensaje },
        { headers: this.getHeaders() }
      )
    );
  }

  async editar(publicacionId: string, comentarioId: string, mensaje: string) {
    return firstValueFrom(
      this.http.put<any>(
        `${environment.apiUrl}/publicaciones/${publicacionId}/comentarios/${comentarioId}`,
        { mensaje },
        { headers: this.getHeaders() }
      )
    );
  }
}