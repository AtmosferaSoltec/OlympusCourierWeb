import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Result } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class RepartoService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/repartos`;

  get(id: number) {
    return this.http.get<Result>(`${this.url}/${id}`);
  }

  getAll(params: any) {
    return this.http.get<Result>(this.url, { params: params })
  }

  setActivo(id_reparto: number, activo: 'S' | 'N') {
    return this.http.patch<Result>(`${this.url}/${id_reparto}`, { activo });
  }

  insert(body: any) {
    return this.http.post<Result>(this.url, body)
  }
}
