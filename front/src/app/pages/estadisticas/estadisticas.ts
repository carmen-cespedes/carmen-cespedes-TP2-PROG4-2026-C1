import { Component, inject, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadisticasService } from '../../estadisticas/estadisticas';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas implements AfterViewInit {
  estadisticasService = inject(EstadisticasService);

  desde = signal('');
  hasta = signal('');

  chartPubUsuario: Chart | null = null;
  chartComentariosPub: Chart | null = null;
  chartComentariosTiempo: Chart | null = null;
  totalComentarios = signal(0);

  @ViewChild('canvasPubUsuario') canvasPubUsuario!: ElementRef;
  @ViewChild('canvasComentariosPub') canvasComentariosPub!: ElementRef;
  @ViewChild('canvasComentariosTiempo') canvasComentariosTiempo!: ElementRef;

  async ngAfterViewInit() {
    await this.cargarEstadisticas();
  }

  async cargarEstadisticas() {
    const desde = this.desde() || undefined;
    const hasta = this.hasta() || undefined;

    const [pubUsuario, totalCom, comPub] = await Promise.all([
      this.estadisticasService.publicacionesPorUsuario(desde, hasta),
      this.estadisticasService.comentarios(desde, hasta),
      this.estadisticasService.comentariosPorPublicacion(desde, hasta),
    ]);

    this.totalComentarios.set(totalCom);
    this.renderGraficoPubUsuario(pubUsuario);
    this.renderGraficoComPub(comPub);
    this.renderGraficoTotalComentarios(totalCom, pubUsuario);
  }

  renderGraficoPubUsuario(data: any[]) {
    if (this.chartPubUsuario) this.chartPubUsuario.destroy();
    this.chartPubUsuario = new Chart(this.canvasPubUsuario.nativeElement, {
      type: 'bar',
      data: {
        labels: data.map(d => d.nombreUsuario || d.nombre),
        datasets: [{
          label: 'Publicaciones',
          data: data.map(d => d.total),
          backgroundColor: 'rgba(174, 108, 231, 0.7)',
        }]
      }
    });
  }

  renderGraficoComPub(data: any[]) {
    if (this.chartComentariosPub) this.chartComentariosPub.destroy();
    this.chartComentariosPub = new Chart(this.canvasComentariosPub.nativeElement, {
      type: 'pie',
      data: {
        labels: data.map(d => d.titulo),
        datasets: [{
          data: data.map(d => d.total),
          backgroundColor: [
            'rgba(108, 231, 221, 0.7)',
            'rgba(250, 255, 178, 0.7)',
            'rgba(174, 108, 231, 0.7)',
            'rgba(231, 108, 108, 0.7)',
          ],
        }]
      }
    });
  }

  renderGraficoTotalComentarios(totalComentarios: number, pubUsuario: any[]) {
    if (this.chartComentariosTiempo) this.chartComentariosTiempo.destroy();
    const totalPublicaciones = pubUsuario.reduce((acc, d) => acc + d.total, 0);
    this.chartComentariosTiempo = new Chart(this.canvasComentariosTiempo.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Comentarios', 'Publicaciones'],
        datasets: [{
          data: [totalComentarios, totalPublicaciones],
          backgroundColor: [
            'rgba(108, 174, 231, 0.7)',
            'rgba(174, 231, 108, 0.7)',
          ],
        }]
      }
    });
  }
}