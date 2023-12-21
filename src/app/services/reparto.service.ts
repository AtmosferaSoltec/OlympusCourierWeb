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

  delete(id: number | undefined, activo: 'N' | 'S') {
    return this.http.patch<Result>(`${this.url}/${id}`, { activo: activo });
  }

  insert(body: any) {
    return this.http.post<Result>(this.url, body)
  }
}
