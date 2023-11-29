import { Injectable } from '@angular/core';
import { ItemReparto } from '../../models/item-reparto';
import { Cliente } from '../../models/cliente';

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
