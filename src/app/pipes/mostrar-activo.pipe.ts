import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarActivo',
  standalone: true
})
export class MostrarActivoPipe implements PipeTransform {

  transform(estado: string | undefined): string {
    if (!estado) return 'Sin Valor';
    switch (estado) {
      case 'S':
        return 'Activo';
      case 'N':
        return 'Inactivo';
      default:
        return 'Sin Estado';
    }
  }

}
