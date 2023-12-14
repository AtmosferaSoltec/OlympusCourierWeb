import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarEstado',
  standalone: true
})
export class MostrarEstadoPipe implements PipeTransform {

  transform(estado: string | undefined): string {
    if(!estado) return 'Sin Estado';
    switch (estado) {
      case 'P':
        return 'Pendiente';
      case 'E':
        return 'Entregado';
      case 'A':
        return 'Anulado';
      default:
        return 'Sin Valor';
    }
  }

}
