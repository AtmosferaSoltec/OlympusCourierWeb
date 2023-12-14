import { Pipe, PipeTransform } from '@angular/core';
import { MetodoPago } from '../interfaces/metodo-pago';

@Pipe({
  name: 'mostrarMetodoPago',
  standalone: true
})
export class MostrarMetodoPagoPipe implements PipeTransform {

  transform(value?: number, list?: MetodoPago[]): string {
    if (!value || !list) return 'Desconocido';
    return list.find(m => m.id === value)?.nombre || 'Desconocido';
  }

}
