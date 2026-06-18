import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);
  private authService = inject(Auth);

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  async listar() {
    return firstValueFrom(
      this.http.get<any[]>(`${environment.apiUrl}/usuarios`, {
        headers: this.getHeaders(),
      })
    );
  }

  async crear(datos: any) {
    return firstValueFrom(
      this.http.post<any>(`${environment.apiUrl}/usuarios`, datos, {
        headers: this.getHeaders(),
      })
    );
  }

  async deshabilitar(id: string) {
    return firstValueFrom(
      this.http.delete<any>(`${environment.apiUrl}/usuarios/${id}`, {
        headers: this.getHeaders(),
      })
    );
  }

  async habilitar(id: string) {
    return firstValueFrom(
      this.http.post<any>(`${environment.apiUrl}/usuarios/${id}/habilitar`, {}, {
        headers: this.getHeaders(),
      })
    );
  }
}