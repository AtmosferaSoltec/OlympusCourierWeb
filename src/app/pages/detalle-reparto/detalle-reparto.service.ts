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
      next: (res: any) => {
        if (res?.isSuccess) {
          this.reparto.set(res.data);
        } else {
          console.log(res?.mensaje || 'Error al obtener el reparto');
        }
      },
      error: (err: any) => {
        alert(err.message)
        console.log(err);
      }
    })
  }
}
