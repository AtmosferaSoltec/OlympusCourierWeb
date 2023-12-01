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
