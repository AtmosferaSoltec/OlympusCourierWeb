import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Distrito } from '../models/distrito';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/documento`;

  getAll(): Observable<Distrito[]> {
    return this.http.get<any>(this.url);
  }
}
