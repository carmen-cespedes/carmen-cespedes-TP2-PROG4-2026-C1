import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-cargando',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargando.html',
  styleUrl: './cargando.css',
})
export class Cargando implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(Auth);
  http = inject(HttpClient);

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngOnInit() {
    const token = this.authService.getToken();
    const redirect = this.route.snapshot.queryParams['redirect'] || '/publicaciones';
    console.log('redirect:', redirect);

    if (!token) {
      await this.delay(1500);
      this.router.navigateByUrl('/login');
      return;
    }

    try {
      const response: any = await firstValueFrom(
        this.http.post(`${environment.apiUrl}/autenticacion/autorizar`, {}, {
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
        })
      );
      console.log('autorizar response:', response);
      this.authService.usuarioActual.set(response);
      await this.delay(1500);
      this.router.navigateByUrl(redirect);
    } catch (e) {
      console.log('autorizar error:', e); 
      await this.delay(1500);
      this.router.navigateByUrl('/login');
    }
  }
}