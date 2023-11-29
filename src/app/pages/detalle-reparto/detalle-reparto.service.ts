import { Injectable, inject } from '@angular/core';
import { Reparto } from '../../models/reparto';
import { RepartoService } from '../../services/reparto.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleRepartoService {

  constructor() { }

  reparto: Reparto | null = null;
  private repartoService = inject(RepartoService)

  getReparto(id: string) {
    this.repartoService.get(Number(id)).subscribe({
      next: (data: any) => {
        if(data && data.isSuccess){
          this.reparto = data.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
