import { Pipe, PipeTransform, inject, signal } from '@angular/core';
import { PaqueteService } from '../services/paquete.service';
import { TipoPaquete } from '../interfaces/tipo-paquete';

@Pipe({
  name: 'showTipoPaquete',
  standalone: true
})
export class ShowTipoPaquetePipe implements PipeTransform {

  transform(value: number | undefined, listTipoPaquetes: TipoPaquete[] | undefined): string {
    if (!value || !listTipoPaquetes) return '';
    let tipoPaquete = listTipoPaquetes.find((tipo: TipoPaquete) => tipo.id == value);
    return tipoPaquete?.nombre || 'Sin tipo de paquete';
  }


}
