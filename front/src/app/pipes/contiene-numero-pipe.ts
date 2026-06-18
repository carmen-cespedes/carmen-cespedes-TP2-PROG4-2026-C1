import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contieneNumero',
  standalone: true,
})
export class ContieneNumeroPipe implements PipeTransform {
  transform(value: string): boolean {
    return /\d/.test(value);
  }
}