import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTelf',
  standalone: true
})
export class FormatTelfPipe implements PipeTransform {

  transform(valor?: string): string {
    if (!valor) {
      return 'Sin teléfono';
    }
    const formattedValue = valor.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    return formattedValue;
  }

}
