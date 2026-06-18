import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  authService = inject(Auth);
  router = inject(Router);

  ngOnInit() {
    if (this.authService.getToken()) {
      this.router.navigateByUrl('/publicaciones');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}