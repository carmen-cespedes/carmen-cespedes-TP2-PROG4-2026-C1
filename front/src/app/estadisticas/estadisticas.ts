import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {
  private http = inject(HttpClient);
  private authService = inject(Auth);

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  async publicacionesPorUsuario(desde?: string, hasta?: string) {
    let url = `${environment.apiUrl}/estadisticas/publicaciones-por-usuario`;
    const params = [];
    if (desde) params.push(`desde=${desde}`);
    if (hasta) params.push(`hasta=${hasta}`);
    if (params.length) url += `?${params.join('&')}`;
    return firstValueFrom(this.http.get<any[]>(url, { headers: this.getHeaders() }));
  }

  async comentarios(desde?: string, hasta?: string) {
    let url = `${environment.apiUrl}/estadisticas/comentarios`;
    const params = [];
    if (desde) params.push(`desde=${desde}`);
    if (hasta) params.push(`hasta=${hasta}`);
    if (params.length) url += `?${params.join('&')}`;
    return firstValueFrom(this.http.get<number>(url, { headers: this.getHeaders() }));
  }

  async comentariosPorPublicacion(desde?: string, hasta?: string) {
    let url = `${environment.apiUrl}/estadisticas/comentarios-por-publicacion`;
    const params = [];
    if (desde) params.push(`desde=${desde}`);
    if (hasta) params.push(`hasta=${hasta}`);
    if (params.length) url += `?${params.join('&')}`;
    return firstValueFrom(this.http.get<any[]>(url, { headers: this.getHeaders() }));
  }
}