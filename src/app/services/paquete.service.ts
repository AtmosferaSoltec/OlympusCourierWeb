import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { TipoPaquete } from '../interfaces/tipo-paquete';
import { State } from '../interfaces/state';
import { delay } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  http = inject(HttpClient);
  token = inject(TokenService).token();
  url = `${environment.baseUrl}/api/paquetes`;

  #state = signal<State<TipoPaquete[]>>({ loading: true, data: [] });
  listTipoPaquetes = computed(() => this.#state().data)
  loading = computed(() => this.#state().loading)

  constructor() {
    this.getAll()
  }

  getAll(estado: 'T' | 'S' | 'N' = 'S') {
    this.#state.set({ loading: true, data: [] })
    this.http.get(`${this.url}`, { params: { estado }, headers: { 'Authorization': `${this.token}` } })
      .pipe(delay(500))
      .subscribe({
        next: (res: any) => {
          this.#state.set({ loading: false, data: res.data })
        },
        error: (err: any) => console.log(err)
      })
  }

  add(nombre: string) {
    const headers = { 'Authorization': `${this.token}` };
    return this.http.post(this.url, { nombre }, { headers: headers })
  }

  update(id: number, nombre: string) {
    const headers = { 'Authorization': `${this.token}` };
    return this.http.put(this.url, { id, nombre }, { headers: headers })
  }

  eliminar(id: number | undefined, estado: string) {
    const url = `${this.url}/${id}`;
    const headers = { 'Authorization': `${this.token}` };
    const body = {
      activo: estado
    }
    return this.http.patch(url, body, { headers: headers });
  }
}
