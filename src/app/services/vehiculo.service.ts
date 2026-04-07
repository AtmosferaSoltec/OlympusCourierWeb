import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Result } from '../interfaces/state';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/vehiculo`;

  getAll(estado: 'T' | 'S' | 'N' = 'S') {
    return this.http.get<Result>(`${this.url}`, { params: { estado } });
  }

  add(nombre: string) {
    return this.http.post(this.url, { nombre });
  }

  update(id: number, nombre: string) {
    return this.http.put(this.url, { id, nombre });
  }

  setActivo(id: number | undefined, estado: string) {
    const body = {
      id: id,
      activo: estado,
    };
    return this.http.patch(this.url, body);
  }
}
