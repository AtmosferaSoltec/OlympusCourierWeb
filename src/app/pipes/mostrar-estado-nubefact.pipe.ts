import { Pipe, PipeTransform } from '@angular/core';
import { Nubefact } from '../interfaces/comprobante';

@Pipe({
  name: 'mostrarEstadoNubefact',
  standalone: true
})
export class MostrarEstadoNubefactPipe implements PipeTransform {

  transform(data?: Nubefact) {
    if (!data) {
      return 'Sin Datos'
    }

    if (data.aceptada_por_sunat === 'true') {
      return 'Aceptada'
    } else {
      return data?.sunat_description ?? 'Pendiente'
    }
  }

}
