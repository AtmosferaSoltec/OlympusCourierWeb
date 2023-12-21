import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { Result, State } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/clientes`;

  #state = signal<State<Cliente[]>>({ data: [], loading: false });
  listClientes = computed(() => this.#state().data);
  loading = computed(() => this.#state().loading);

  searchCliente(data: string): Observable<Cliente[]> {
    return this.http.get<any>(`${this.url}/search/${data}`)
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

  getAll(params: any) {
    return this.http.get<Result>(this.url, { params: params });
  }

  setEstado(id: number, estado: string) {
    return this.http.patch(`${this.url}/${id}`, { activo: estado });
  }

  getCliente(id: string | null) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

}
