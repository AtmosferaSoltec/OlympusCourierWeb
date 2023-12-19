import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Distrito } from '../interfaces/distrito';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  http = inject(HttpClient);
  token = inject(TokenService).token();
  url = `${environment.baseUrl}/api/distrito`;

  #state = signal<State<Distrito[]>>({ loading: false, data: [] })
  listDistritos = computed(() => this.#state().data)
  loading = computed(() => this.#state().loading)

  constructor() {
    this.getAll()
  }

  getAll(estado: 'T' | 'S' | 'N' = 'S') {
    this.#state.set({ loading: true, data: [] })
    this.http.get<any>(this.url, { params: { estado: estado }, headers: { 'Authorization': `${this.token}` } })
      .pipe(delay(500))
      .subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.#state.set({ loading: false, data: res.data })
          } else {
            this.#state.set({ loading: false, data: [], error: res?.mensaje })
          }
        },
        error: (err: any) => console.log(err)
      })
  }

  get(id: number) {
    return this.http.get(`${this.url}/${id}`)
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
    const body = {
      activo: estado
    }
    const headers = { 'Authorization': `${this.token}` };
    return this.http.patch(url, body, { headers: headers });
  }
}
