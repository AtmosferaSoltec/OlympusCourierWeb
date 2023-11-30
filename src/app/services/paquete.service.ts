import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { TipoPaquete } from '../models/tipo-paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/paquetes`;
  
  constructor() { }

  getAll(){
    return this.http.get(`${this.url}`)
  }

  eliminar(tipo: TipoPaquete) {
    const url = `${this.url}/${tipo.id}`;
    const body = {
      activo: tipo.activo === 'S' ? 'N' : 'E'
    }
    return this.http.patch(url, body);
  }
}
