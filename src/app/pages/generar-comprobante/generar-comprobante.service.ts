import { Injectable, signal } from '@angular/core';
import { Reparto } from '../../interfaces/reparto';

@Injectable({
  providedIn: 'root'
})
export class GenerarComprobanteService {

  listRepartos = signal<Reparto[]>([]);

  constructor() { }

  reset() {
    this.listRepartos.set([])
  }

}
