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
  loading = computed(() => this.#state().loading)

  getAll(estado: 'T' | 'S' | 'N' = 'T') {
    this.#state.set({ loading: true, data: [] })
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    this.http.get(this.url, { params: { estado, id_ruc } })
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
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    return this.http.post(this.url, { nombre, id_ruc })
  }

  update(id: number, nombre: string) {
    return this.http.put(this.url, { id, nombre })
  }

  eliminar(id: number | undefined, estado: string) {
    const url = `${this.url}/${id}`;
    const body = {
      activo: estado
    }
    return this.http.patch(url, body);
  }
}
