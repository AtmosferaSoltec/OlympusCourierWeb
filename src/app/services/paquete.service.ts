import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { TipoPaquete } from '../interfaces/tipo-paquete';
import { State } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/paquetes`;

  $state = signal<State<TipoPaquete[]>>({ loading: true, data: [] });
  public listTipoPaquetes = computed(() => this.$state().data)

  constructor() {
    this.getAll()
  }

  getAll() {
    this.http.get(`${this.url}`)
    .subscribe({
      next: (res: any) => {
        this.$state.set({ loading: false, data: res.data })
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
