import { Injectable } from '@angular/core';
import { ItemReparto } from '../../interfaces/item-reparto';
import { Cliente } from '../../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class AgregarRepartoService {

  listItemRepartos: ItemReparto[] = []
  cliente: Cliente | null = null

  constructor() { }

  reset() {
    this.listItemRepartos = [];
    this.cliente = null;
  }

}
