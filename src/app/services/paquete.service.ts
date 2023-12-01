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

  getAll() {
    return this.http.get(`${this.url}`)
  }
  
  add(nombre: string) {
    return this.http.post(this.url, { nombre: nombre })
  }

  eliminar(id: number | undefined, estado: string) {
    const url = `${this.url}/${id}`;
    const body = {
      activo: estado
    }
    return this.http.patch(url, body);
  }
}
