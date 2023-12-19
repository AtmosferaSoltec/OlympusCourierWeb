import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { State } from '../interfaces/state';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  http = inject(HttpClient);
  token = inject(TokenService).token();
  url = `${environment.baseUrl}/api/clientes`;

  #state = signal<State<Cliente[]>>({ data: [], loading: false });
  listClientes = computed(() => this.#state().data);
  loading = computed(() => this.#state().loading);

  constructor() {
    this.getAll()
  }

  searchCliente(data: string): Observable<Cliente[]> {
    const headers = { 'Authorization': `${this.token}` };
    return this.http.get<any>(`${this.url}/search/${data}`, { headers: headers })
  }

  addCliente(cliente: any) {
    const headers = { 'Authorization': `${this.token}` };
    return this.http.post(this.url, cliente, { headers: headers })
  }
  updateCliente(cliente: any, id: any) {
    const headers = { 'Authorization': `${this.token}` };
    return this.http.put(`${this.url}/${id}`, cliente, { headers: headers })
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
    const headers = { 'Authorization': `${this.token}` };
    this.http.get<any>(this.url, { params: { estado }, headers: headers })
      .subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.#state.set({ data: res.data, loading: false });
          } else {
            this.#state.set({ data: [], loading: false });
          }
        },
        error: (err: any) => {
          alert(err.message);
          console.log(err);
          this.#state.set({ data: [], loading: false, error: err.message });
        }
      });
  }

  delete(id: number | undefined, estado: string) {
    if (!id) throw new Error('No se encontró el id del cliente');
    const headers = { 'Authorization': `${this.token}` };
    const body = {
      id,
      activo: estado
    }
    return this.http.patch(this.url, body, { headers: headers });
  }

  getCliente(id: string | null) {
    const headers = { 'Authorization': `${this.token}` };
    return this.http.get<any>(`${this.url}/${id}`, { headers: headers });
  }

}
