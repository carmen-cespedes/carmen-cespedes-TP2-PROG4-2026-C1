import { Component, inject, signal, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Auth } from '../../auth/auth';
import { PublicacionesService } from '../../publicaciones/publicaciones';
import { ComentariosService } from '../../comentarios/comentarios';


@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion {
  route = inject(ActivatedRoute);
  authService = inject(Auth);
  publicacionesService = inject(PublicacionesService);
  comentariosService = inject(ComentariosService);

  publicacionId = signal(this.route.snapshot.paramMap.get('id') ?? '');
  comentarios = signal<any[]>([]);
  offset = signal(0);
  limit = 5;
  hayMas = signal(true);
  nuevoComentario = signal('');
  comentarioEditandoId = signal<string | null>(null);
  mensajeEditando = signal('');
  error = signal('');

  publicacionResource = resource({
    params: () => ({ id: this.publicacionId(), token: this.authService.getToken() }),
    loader: async ({ params }) => {
      if (!params.id || !params.token) return null;
      const pubs = await this.publicacionesService.listarConToken('fecha', params.token, 0, 100);
      return pubs.find((p: any) => p._id === params.id) ?? null;
    }
  });

  constructor() {
    this.cargarComentarios();
  }

  async cargarComentarios() {
    try {
      const nuevos = await this.comentariosService.listar(this.publicacionId(), this.offset(), this.limit);
      this.comentarios.update(c => [...c, ...nuevos]);
      if (nuevos.length < this.limit) this.hayMas.set(false);
    } catch (e: any) {
      this.error.set('Error al cargar comentarios.');
    }
  }

  async cargarMas() {
    this.offset.update(o => o + this.limit);
    await this.cargarComentarios();
  }

  async enviarComentario() {
    if (!this.nuevoComentario()) return;
    try {
      await this.comentariosService.crear(this.publicacionId(), this.nuevoComentario());
      this.nuevoComentario.set('');
      this.comentarios.set([]);
      this.offset.set(0);
      this.hayMas.set(true);
      await this.cargarComentarios();
    } catch (e: any) {
      this.error.set('Error al enviar comentario.');
    }
  }

  iniciarEdicion(comentario: any) {
    this.comentarioEditandoId.set(comentario._id);
    this.mensajeEditando.set(comentario.mensaje);
  }

  async guardarEdicion(comentario: any) {
    try {
      const editado = await this.comentariosService.editar(
        this.publicacionId(),
        comentario._id,
        this.mensajeEditando()
      );
      this.comentarios.update(c =>
        c.map(co => co._id === editado._id ? { ...editado, usuario: co.usuario } : co)
      );
      this.comentarioEditandoId.set(null);
    } catch (e: any) {
      this.error.set('Error al editar comentario.');
    }
  }

  cancelarEdicion() {
    this.comentarioEditandoId.set(null);
  }
}