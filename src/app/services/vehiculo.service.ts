import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { delay } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Result, State } from '../interfaces/state';
import { TipoPaquete } from '../interfaces/tipo-paquete';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/vehiculo`;

  getAll(estado: 'T' | 'S' | 'N' = 'S') {
    return this.http.get<Result>(`${this.url}`, { params: { estado } })
  }

  add(nombre: string) {
    return this.http.post(this.url, { nombre })
  }

  update(id: number, nombre: string) {
    return this.http.put(this.url, { id, nombre })
  }

  setActivo(id: number | undefined, estado: string) {
    const body = {
      id: id,
      activo: estado
    }
    return this.http.patch(this.url, body);
  }
}
