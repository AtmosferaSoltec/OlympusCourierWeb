import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';
import { Comprobante } from '../interfaces/comprobante';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  http = inject(HttpClient);
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
      idUser: string,
      id_ruc: string
    } = {
        estado: 'T',
        metodoPago: 'T',
        tipoDoc: '1',
        idUser: 'T',
        id_ruc: ''
      }
  ) {
    this.#state.set({ loading: true, data: [] })
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    data.id_ruc = id_ruc;
    this.http.get(this.url, { params: data })
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
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    return this.http.get(`${this.url}/${idReparto}`, { params: { id_ruc } });
  }

  insert(data: any) {
    return this.http.post(this.url, data);
  }

}
