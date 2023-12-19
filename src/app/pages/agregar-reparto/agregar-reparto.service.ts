import { Injectable, signal } from '@angular/core';
import { ItemReparto } from '../../interfaces/item-reparto';
import { Cliente } from '../../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class AgregarRepartoService {

  listItemRepartos: ItemReparto[] = []
  cliente = signal<Cliente | null>(null);

  constructor() { }

  reset() {
    this.listItemRepartos = [];
    this.cliente.set(null);
  }

}
