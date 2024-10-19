import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { Result, State } from '../interfaces/state';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/clientes`;
  newUrl = `${environment.newUrl}/api/cliente`;

  #state = signal<State<Cliente[]>>({ data: [], loading: false });
  listClientes = computed(() => this.#state().data);
  loading = computed(() => this.#state().loading);

  search(term: string) {
    return this.http.get(`${this.newUrl}/search`, { params: { term } });
  }

  searchCliente(data: string): Observable<Cliente[]> {
    return this.http.get<any>(`${this.url}/search/${data}`);
  }

  addCliente(cliente: any) {
    return this.http.post(this.newUrl, cliente);
  }
  updateCliente(id: number, cliente: any) {
    return this.http.patch(`${this.newUrl}/${id}`, cliente);
  }

  exportClientes(listClientes: Cliente[]) {
    const call = this.http.post(
      this.url + '/exportarCliente',
      { listClientes },
      { responseType: 'arraybuffer' }
    );
    call.subscribe({
      next: (data: ArrayBuffer) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'data_clientes.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      },
    });
  }

  getAll(filtros?: ClienteFiltro) {
    const params: any = {
      ...filtros,
    };
    const f = this.http.get(this.newUrl, { params });
    return f;
  }

  get(id: number) {
    return this.http.get(`${this.newUrl}/${id}`);
  }

  setEstado(id: number, estado: string) {
    return this.http.patch(`${this.url}/${id}`, { activo: estado });
  }

  getCliente(id: string | null) {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}

export interface ClienteFiltro {
  activo?: string | null | undefined;
  tipo_doc?: string | null | undefined;
  documento?: string | null | undefined;
  page?: string;
  limit?: string | null | undefined;
}
