import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Distrito } from '../interfaces/distrito';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';

@Injectable({
  providedIn: 'root',
})
export class DistritoService {
  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/distrito`;
  newUrl = `${environment.newUrl}/api/distrito`;

  isLoading = signal(false);
  list = signal<Distrito[]>([]);

  // Parametros
  activo = signal<'S' | 'N'>('S'); // T -> Todos, S -> Solo activos, N -> Solo inactivos

  getAll() {
    this.isLoading.set(true);
    const params: any = {
      estado: this.activo(),
    };
    console.log(params);
    
    this.http.get(this.url, { params }).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          this.list.set(res?.data ?? []);
        } else {
          console.log(res);
        }
      },
      error: (err: any) => console.log(err),
      complete: () => this.isLoading.set(false),
    });
  }

  get(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  add(nombre: string) {
    return this.http.post(this.url, { nombre });
  }

  update(id: number, nombre: string) {
    return this.http.put(this.url, { id, nombre });
  }

  eliminar(id: number | undefined, estado: string) {
    const url = `${this.url}/${id}`;
    const body = {
      activo: estado,
    };
    return this.http.patch(url, body);
  }
}
