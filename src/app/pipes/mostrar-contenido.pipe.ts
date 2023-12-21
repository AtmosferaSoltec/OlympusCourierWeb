import { Pipe, PipeTransform } from '@angular/core';
import { ItemReparto } from '../interfaces/item-reparto';

@Pipe({
  name: 'mostrarContenido',
  standalone: true
})
export class MostrarContenidoPipe implements PipeTransform {

  transform(item?: ItemReparto[]): unknown {
    return item?.map(i => `(${i.cant}) ${i.tipo_paquete}`).join(', ');
  }

}
