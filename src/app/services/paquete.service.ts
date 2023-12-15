import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { TipoPaquete } from '../interfaces/tipo-paquete';
import { State } from '../interfaces/state';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/paquetes`;

  #state = signal<State<TipoPaquete[]>>({ loading: true, data: [] });
  listTipoPaquetes = computed(() => this.#state().data)
  loading = computed(() => this.#state().loading)

  constructor() {
    this.getAll()
  }

  getAll(estado: 'T' | 'S' | 'N' = 'T') {
    this.#state.set({ loading: true, data: [] })
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    this.http.get(`${this.url}`, { params: { estado, id_ruc } })
      .pipe(delay(500))
      .subscribe({
        next: (res: any) => {
          this.#state.set({ loading: false, data: res.data })
        },
        error: (err: any) => console.log(err)
      })
  }

  add(nombre: string) {
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    return this.http.post(this.url, { nombre, id_ruc })
  }

  update(id: number, nombre: string) {
    return this.http.put(`${this.url}/${id}`, { nombre: nombre })
  }

  eliminar(id: number | undefined, estado: string) {
    const url = `${this.url}/${id}`;
    const body = {
      activo: estado
    }
    return this.http.patch(url, body);
  }
}
