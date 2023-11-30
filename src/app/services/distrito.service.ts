import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Distrito } from '../models/distrito';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/distrito`;

  

  listarDistritos(): Observable<Distrito[]> {
    return this.http.get<any>(this.url);
  }

  eliminar(distrito: Distrito) {
    const url = `${this.url}/${distrito.id}`;
    const body = {
      activo: distrito.activo === 'S' ? 'N' : 'E'
    }
    return this.http.patch(url, body);
  }
}
