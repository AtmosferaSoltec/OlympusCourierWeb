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

  listarDestinos(): Observable<Distrito[]> {
    const url = `${environment.baseUrl}/api/distrito`;
    return this.http.get<any>(url);
  }
}
