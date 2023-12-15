import { Injectable, computed, inject, signal } from '@angular/core';
import { Reparto } from '../interfaces/reparto';
import { delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class RepartoService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/repartos`;

  #state = signal<State<Reparto[]>>({
    loading: true,
    data: []
  });
  public listRepartos = computed(() => this.#state().data);
  public loading = computed(() => this.#state().loading);

  get(id: number) {
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    return this.http.get(`${this.url}/${id}`, { params: { id_ruc } });
  }

  getAll(estado: 'T' | 'S' | 'N' = 'T') {
    this.#state.set({ loading: true, data: [] });
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    this.http.get<any>(this.url, { params: { estado: estado, id_ruc: id_ruc } })
      .pipe(delay(500))
      .subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.#state.set({
              loading: false,
              data: res.data
            });
          } else {
            this.#state.set({
              loading: false,
              data: [],
              error: res?.mensaje || 'Error al obtener los repartos'
            });
          }
        },
        error: (err: any) => {
          this.#state.set({
            loading: false,
            error: err.message
          });
        }
      });
  }

  delete(id: number | undefined, activo: 'N' | 'S') {
    return this.http.patch(`${this.url}/${id}`, { activo: activo });
  }

  insert(body: any) {
    return this.http.post(this.url, body)
  }
}
