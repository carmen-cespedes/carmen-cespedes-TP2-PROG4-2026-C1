import { Component, inject, OnInit, signal } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Auth } from './auth/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  authService = inject(Auth);
  http = inject(HttpClient);

  mostrarModalSesion = signal(false);
  private intervalo: any;

  ngOnInit() {
    if (this.authService.getToken()) {
      this.iniciarContador();
    }
    this.authService.sesionIniciada.subscribe(() => {
      this.iniciarContador();
    });
  }

  iniciarContador() {
    if (this.intervalo) clearInterval(this.intervalo);
    let minutos = 0;
    this.intervalo = setInterval(() => {
      minutos++;
      if (minutos === 10) {
        this.mostrarModalSesion.set(true);
      }
      if (minutos >= 15) {
        clearInterval(this.intervalo);
        this.mostrarModalSesion.set(false);
        this.authService.cerrarSesion();
      }
    }, 60000);
  }

  async extenderSesion() {
    try {
      const token = this.authService.getToken();
      const response: any = await firstValueFrom(
        this.http.post(`${environment.apiUrl}/autenticacion/refrescar`, {}, {
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
        })
      );
      localStorage.setItem('token', response.token);
      this.mostrarModalSesion.set(false);
      this.iniciarContador();
    } catch {
      this.authService.cerrarSesion();
    }
  }

  cerrarSinExtender() {
    this.mostrarModalSesion.set(false);
    this.authService.cerrarSesion();
  }
}
