import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';
import { MetodoPago } from '../interfaces/metodo-pago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/metodopago`;

  constructor() {
    this.getAll();
  }

  #state = signal<State<MetodoPago[]>>({ loading: true, data: [] });
  listMetodoPago = computed(() => this.#state().data);

  getAll() {
    this.http.get(this.url).subscribe({
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
}
