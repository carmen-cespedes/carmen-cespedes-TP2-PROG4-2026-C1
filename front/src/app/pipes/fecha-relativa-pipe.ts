import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaRelativa',
  standalone: true,
})
export class FechaRelativaPipe implements PipeTransform {
  transform(value: string | Date): string {
    const fecha = new Date(value);
    const ahora = new Date();
    const diff = ahora.getTime() - fecha.getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (minutos < 1) return 'Justo ahora';
    if (minutos < 60) return `Hace ${minutos} minutos`;
    if (horas < 24) return `Hace ${horas} horas`;
    if (dias < 7) return `Hace ${dias} días`;
    return fecha.toLocaleDateString('es-AR');
  }
}