import { Injectable, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Reparto } from '../../interfaces/reparto';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { MetodoPago } from '../../interfaces/metodo-pago';

@Injectable({
  providedIn: 'root'
})
export class GenerarComprobanteService {

  listRepartos = signal<Reparto[]>([]);
  listMetodoPago = signal<MetodoPago[]>([]);

  metodoPagoService = inject(MetodoPagoService);

  reset() {
    this.listRepartos.set([])
    this.listMetodoPago.set([]);
  }

  listarMetodosPago() {
    this.metodoPagoService.getAll({ estado: 'S' }).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          this.listMetodoPago.set(res?.data);
        }
      },
      error: (err) => {
        alert(err.message)
      }
    })
  }

}
