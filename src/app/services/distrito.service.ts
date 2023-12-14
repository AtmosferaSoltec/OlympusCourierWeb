import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Distrito } from '../interfaces/distrito';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/distrito`;

  #state = signal<State<Distrito[]>>({ loading: false, data: [] })
  listDistritos = computed(() => this.#state().data)

  constructor(){
    this.getAll()
  }

  getAll() {
    this.http.get<any>(this.url).subscribe({
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

  add(nombre: string) {
    return this.http.post(this.url, { nombre: nombre })
  }

  eliminar(id: number | undefined, estado: string) {
    const url = `${this.url}/${id}`;
    const body = {
      activo: estado
    }
    return this.http.patch(url, body);
  }
}
