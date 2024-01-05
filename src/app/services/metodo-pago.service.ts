import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Result, State } from '../interfaces/state';
import { MetodoPago } from '../interfaces/metodo-pago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/metodopago`;

  constructor() {
    this.listarMetodosPago();
  }

  #state = signal<State<MetodoPago[]>>({ loading: true, data: [] });
  listMetodoPago = computed(() => this.#state().data);
  loading = computed(() => this.#state().loading)

  listarMetodosPago(estado: 'T' | 'S' | 'N' = 'S') {
    this.#state.set({ loading: true, data: [] })
    const queryParams = { estado }
    this.getAll(queryParams)
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

  getAll(queryParams: any) {
    return this.http.get<Result>(this.url, { params: queryParams })
  }


  add(nombre: string) {
    return this.http.post(this.url, { nombre })
  }

  update(id: number, nombre: string) {
    return this.http.put(this.url, { id, nombre })
  }

  eliminar(id: number | undefined, activo: string) {
    return this.http.patch(this.url, { id, activo });
  }
}
