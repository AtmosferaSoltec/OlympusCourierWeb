import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';
import { Comprobante } from '../interfaces/comprobante';
import { delay } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  http = inject(HttpClient);
  token = inject(TokenService).token();
  url = `${environment.baseUrl}/api/comprobantes`;

  #state = signal<State<Comprobante[]>>({ loading: true, data: [] })
  listComprobantes = computed(() => this.#state().data);
  loading = computed(() => this.#state().loading);

  constructor(

  ) {
    this.getAll();
  }

  getAll(
    data: {
      estado: 'T' | 'A' | 'N',
      metodoPago: string,
      tipoDoc: 'T' | '1' | '6',
      idUser: string
    } = {
        estado: 'T',
        metodoPago: 'T',
        tipoDoc: '1',
        idUser: 'T'
      }
  ) {
    this.#state.set({ loading: true, data: [] })
    this.http.get(this.url, { params: data, headers: { 'Authorization': `${this.token}` } })
      .pipe(delay(500))
      .subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.#state.set({ loading: false, data: res.data })
          } else {
            this.#state.set({ loading: false, error: res?.mensaje ?? 'Error al obtener comprobantes' })
          }
        },
        error: (err: any) => {
          console.log(err.message)
          this.#state.set({ loading: false, data: [] })
        }
      })
  }

  get(idReparto: number) {
    return this.http.get(`${this.url}/${idReparto}`, { headers: { 'Authorization': `${this.token}` } });
  }

  insert(data: any) {
    return this.http.post(this.url, data, { headers: { 'Authorization': `${this.token}` } });
  }

}
