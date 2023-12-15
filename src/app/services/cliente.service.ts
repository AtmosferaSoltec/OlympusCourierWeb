import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { State } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/clientes`;

  #state = signal<State<Cliente[]>>({ data: [], loading: false });
  listClientes = computed(() => this.#state().data);
  loading = computed(() => this.#state().loading);

  constructor(){
    this.getAll()
  }

  searchCliente(data: string): Observable<Cliente[]> {
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    return this.http.get<any>(`${this.url}/search/${data}`, { params: { id_ruc } })
  }

  addCliente(cliente: any) {
    return this.http.post(this.url, cliente)
  }
  updateCliente(cliente: any, id: any) {
    return this.http.put(`${this.url}/${id}`, cliente)
  }

  exportClientes(listClientes: Cliente[]) {
    const call = this.http.post(this.url + '/exportarCliente', { listClientes }, { responseType: 'arraybuffer' })
    call.subscribe({
      next: (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'data_clientes.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      }
    });
  }

  getAll(estado: 'T' | 'S' | 'N' = 'T') {
    this.#state.set({ data: [], loading: true });
    this.http.get<any>(this.url, { params: { estado } }).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          this.#state.set({ data: res.data, loading: false });
        } else {
          this.#state.set({ data: [], loading: false });
        }
      },
      error: (err: any) => {
        console.log(err);
        this.#state.set({ data: [], loading: false, error: err.message});
      }
    });
  }

  getCliente(id: string) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

}
