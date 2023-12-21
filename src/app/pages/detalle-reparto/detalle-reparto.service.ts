import { Injectable, inject, signal } from '@angular/core';
import { Reparto } from '../../interfaces/reparto';
import { RepartoService } from '../../services/reparto.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleRepartoService {

  constructor() { }

  reparto = signal<Reparto | null>(null);
  private repartoService = inject(RepartoService)

  getReparto(id: number) {
    this.repartoService.get(id).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          this.reparto.set(res.data);
          console.log(res.data);
        } else {
          alert(res?.mensaje || 'Error al obtener el reparto');
          console.log(res?.mensaje);
        }
      },
      error: (err: any) => {
        alert(err.message)
        console.log(err);
      }
    })
  }
}
