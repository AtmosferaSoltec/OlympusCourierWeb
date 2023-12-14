import { Pipe, PipeTransform } from '@angular/core';
import { Comprobante } from '../interfaces/comprobante';

@Pipe({
  name: 'mostrarComprobante',
  standalone: true
})
export class MostrarComprobantePipe implements PipeTransform {

  transform(id?: number, listComprobantes?: Comprobante[]): string {
    if (!id || !listComprobantes) return 'Sin comprobante';
    let comprobante = listComprobantes.find(c => c.id_reparto == id);
    return `${comprobante?.serie} - ${comprobante?.num_serie}`;
  }

}
