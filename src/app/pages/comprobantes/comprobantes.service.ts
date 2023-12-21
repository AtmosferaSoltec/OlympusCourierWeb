import { Injectable, inject, signal } from '@angular/core';
import { Comprobante } from '../../interfaces/comprobante';
import { FormControl, FormGroup } from '@angular/forms';
import { fechaActual } from '../../util/funciones';
import { ComprobanteService } from '../../services/comprobante.service';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesService {

  comprobanteService = inject(ComprobanteService);
  listComprobantes = signal<Comprobante[]>([]);
  isLoading = signal<boolean>(false);

  constructor() { }


  formulario = new FormGroup({
    serie: new FormControl(''),
    comprobante: new FormControl(''),
    cliente: new FormControl(''),
    desde: new FormControl<string>(fechaActual()),
    hasta: new FormControl<string>(fechaActual()),
    tipo_comprobante: new FormControl('T'),
    activo: new FormControl('S'),
    id_metodo_pago: new FormControl(''),
  });

  listarComprobantes(params: any) {
    this.isLoading.set(true);
    this.comprobanteService.getAll(params)
      .pipe(delay(800))
      .subscribe(({
        next: (res) => {
          this.listComprobantes.set(res.data);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      }))
  }
}
