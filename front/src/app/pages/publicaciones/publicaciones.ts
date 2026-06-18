import { Component, inject, resource, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionesService } from '../../publicaciones/publicaciones';
import { Auth } from '../../auth/auth';
import { FechaRelativaPipe } from '../../pipes/fecha-relativa-pipe';
import { ResaltarDirective } from '../../directives/resaltar';
import { TooltipDirective } from '../../directives/tooltip';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FechaRelativaPipe, ResaltarDirective, TooltipDirective],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export class Publicaciones {
  publicacionesService = inject(PublicacionesService);
  authService = inject(Auth);
  modalService = inject(NgbModal);

  @ViewChild('modalNuevaPublicacion') modalNuevaPublicacion!: TemplateRef<any>;

  orden = signal('fecha');
  error = signal('');
  nuevaPublicacion = { titulo: '', descripcion: '' };
  imagenArchivo: File | undefined;
  cargandoCrear = signal(false);
  pagina = signal(0);
  limit = 10;

  publicacionesResource = resource({
    params: () => ({ 
      orden: this.orden(), 
      token: this.authService.getToken(),
      offset: this.pagina() * this.limit
    }),
    loader: ({ params }) =>
      params.token
        ? this.publicacionesService.listarConToken(params.orden, params.token, params.offset, this.limit)
        .then(pubs => { console.log(pubs); return pubs; })
        : Promise.resolve([])
  });

  paginaAnterior() {
    if (this.pagina() > 0) this.pagina.update(p => p - 1);
  }

  paginaSiguiente() {
    this.pagina.update(p => p + 1);
  }

  cambiarOrden(nuevoOrden: string) {
    this.orden.set(nuevoOrden);
  }

  abrirModal() {
    this.modalService.open(this.modalNuevaPublicacion, { 
      centered: true,
      container: 'body'
    });
  }

  onImagenSeleccionada(event: any) {
    this.imagenArchivo = event.target.files[0];
  }

  async crearPublicacion(modal: any) {
    if (!this.nuevaPublicacion.titulo || !this.nuevaPublicacion.descripcion) return;
    this.cargandoCrear.set(true);
    try {
      await this.publicacionesService.crear(this.nuevaPublicacion, this.imagenArchivo);
      this.publicacionesResource.reload();
      this.nuevaPublicacion = { titulo: '', descripcion: '' };
      this.imagenArchivo = undefined;
      modal.close();
    } catch (e: any) {
      this.error.set('Error al crear publicación.');
    } finally {
      this.cargandoCrear.set(false);
    }
  }

  async eliminar(id: string) {
    try {
      await this.publicacionesService.eliminar(id);
      this.publicacionesResource.reload();
    } catch (e: any) {
      this.error.set('Error al eliminar publicación.');
    }
  }

  async toggleMeGusta(pub: any) {
    const usuarioId = this.authService.usuarioActual()?._id;
    const yaDioMeGusta = pub.meGusta.includes(usuarioId);
    try {
      if (yaDioMeGusta) {
        await this.publicacionesService.quitarMeGusta(pub._id);
      } else {
        await this.publicacionesService.darMeGusta(pub._id);
      }
      this.publicacionesResource.reload();
    } catch (e: any) {
      this.error.set('Error al procesar me gusta.');
    }
  }
}