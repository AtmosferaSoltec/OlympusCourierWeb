import { Injectable, inject } from '@angular/core';
import { Reparto } from '../models/reparto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { environment } from '../../environments/environment.development';
import { ItemReparto } from '../models/item-reparto';

@Injectable({
  providedIn: 'root'
})
export class RepartoService {

  clienteService = inject(ClienteService)
  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/repartos`;

  get(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  listarRepartos(): Observable<Reparto[]> {
    return this.http.get<any>(this.url);
  }

  delete(id: number | undefined, activo: 'N' | 'S') {
    return this.http.patch(`${this.url}/${id}`, { activo: activo });
  }

  insert(
    body: any
  ) {
    return this.http.post(this.url, body)
  }
}
