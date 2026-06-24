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
    let segundos = 0;
    this.intervalo = setInterval(() => {
      segundos++;
      if (segundos === 1500) {
        this.mostrarModalSesion.set(true);
      }
      if (segundos >= 3000) {
        clearInterval(this.intervalo);
        this.mostrarModalSesion.set(false);
        this.authService.cerrarSesion();
      }
    }, 1000);
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
