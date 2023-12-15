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
          console.log(res.data);
          
          this.reparto.set(res.data);
        } else {
          console.log(res?.mensaje || 'Error al obtener el reparto');
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
