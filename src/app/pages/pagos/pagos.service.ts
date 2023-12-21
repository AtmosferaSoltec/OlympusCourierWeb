import { Injectable, inject, signal } from '@angular/core';
import { Reparto } from '../../interfaces/reparto';
import { RepartoService } from '../../services/reparto.service';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  repartoService = inject(RepartoService);

  listRepartosEncontrados = signal<Reparto[]>([]);
  listRepartosSeleccionados = signal<Reparto[]>([]);
  isLoading = signal<boolean>(false);

  constructor() {

  }

  reset() {
    this.listRepartosEncontrados.set([]);
    this.listRepartosSeleccionados.set([]);
    this.isLoading.set(false);
  }

  buscarRepartos(params: any) {
    this.isLoading.set(true)
    this.repartoService.getAll(params)
      .pipe(delay(500))
      .subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            //Solo obtener los repartos que no tengan id_comprobante
            const listFilter = res.data.filter((r: Reparto) => !r.id_comprobante);
            this.listRepartosEncontrados.set(listFilter);
          } else {
            alert(res?.mensaje || 'Error al obtener los repartos');
            this.listRepartosEncontrados.set([]);
          }
          this.isLoading.set(false);
        },
        error: (err: any) => {
          alert(err.message);
          this.listRepartosEncontrados.set([]);
          this.isLoading.set(false);
        }
      })
  }

  quitarItem(item: Reparto) {
    this.listRepartosSeleccionados.set(this.listRepartosSeleccionados().filter(r => r.id !== item.id))
  }

  agregarItem(item: Reparto) {
    this.listRepartosSeleccionados.set([...this.listRepartosSeleccionados(), item])
  }
}
