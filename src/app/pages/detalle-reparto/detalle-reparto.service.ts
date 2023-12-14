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
      next: (data: any) => {
        if(data?.isSuccess){
          this.reparto.set(data.data);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
