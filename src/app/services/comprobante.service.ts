import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Result, State } from '../interfaces/state';
import { Comprobante } from '../interfaces/comprobante';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {


  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/comprobantes`;


  getAll(params: any) {
    return this.http.get<Result>(this.url, { params: params })
  }

  get(idReparto: number) {
    return this.http.get<Result>(`${this.url}/${idReparto}`);
  }

  insert(data: any) {
    return this.http.post<Result>(this.url, data);
  }
  anular(body: any) {
    return this.http.post<Result>(`${this.url}/anular`, body);
  }

}
