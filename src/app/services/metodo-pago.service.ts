import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';
import { MetodoPago } from '../interfaces/metodo-pago';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  http = inject(HttpClient);
  token = inject(TokenService).token();
  url = `${environment.baseUrl}/api/metodopago`;

  constructor() {
    this.getAll();
  }

  #state = signal<State<MetodoPago[]>>({ loading: true, data: [] });
  listMetodoPago = computed(() => this.#state().data);
  loading = computed(() => this.#state().loading)

  getAll(estado: 'T' | 'S' | 'N' = 'S') {
    this.#state.set({ loading: true, data: [] })
    this.http.get(this.url, { params: { estado }, headers: { 'Authorization': `${this.token}` } })
      .subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.#state.set({ loading: false, data: res?.data });
          } else {
            this.#state.set({ loading: false, error: res?.mensaje ?? 'Error desconocido' });
          }
        },
        error: (err: any) => {
          this.#state.set({ loading: false, error: err.message });
        }
      })
  }


  add(nombre: string) {
    return this.http.post(this.url, { nombre }, { headers: { 'Authorization': `${this.token}` } })
  }

  update(id: number, nombre: string) {
    return this.http.put(this.url, { id, nombre }, { headers: { 'Authorization': `${this.token}` } })
  }

  eliminar(id: number | undefined, activo: string) {
    const headers = { 'Authorization': `${this.token}` };
    return this.http.patch(this.url, { id, activo }, { headers: headers });
  }
}
