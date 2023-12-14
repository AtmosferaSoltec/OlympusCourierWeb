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
    return this.http.get(`${this.url}/${id}`);
  }

  getAll(estado: 'T' | 'S' | 'N' = 'T') {
    this.#state.set({ loading: true, data: [] });
    this.http.get<any>(this.url, { params: { estado: estado } })
      .pipe(delay(500))
      .subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.#state.set({
              loading: false,
              data: res.data
            });
          }
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
