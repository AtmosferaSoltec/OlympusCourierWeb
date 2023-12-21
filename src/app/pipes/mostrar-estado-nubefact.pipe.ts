import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarEstadoNubefact',
  standalone: true
})
export class MostrarEstadoNubefactPipe implements PipeTransform {

  transform(data?: number) {
    switch (data) {
      case 0: return 'Pendiente';
      case 1: return 'En Sunat';
      default: return 'Sin Datos';
    }
  }

}
