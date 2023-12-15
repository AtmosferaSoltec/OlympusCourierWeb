import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarGenero',
  standalone: true
})
export class MostrarGeneroPipe implements PipeTransform {

  transform(value?: string): string {
    switch (value) {
      case 'M':
        return 'Masculino'
      case 'F':
        return 'Femenino'
      case 'S':
        return 'Sin especificar'
      default:
        return 'Sin Valor'
    }
  }

}
