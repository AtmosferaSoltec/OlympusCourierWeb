import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../interfaces/usuario';
import { FormGroup } from '@angular/forms';
import { State } from '../interfaces/state';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  $state = signal<State<Usuario[]>>({ loading: true, data: [] });
  public listUsuarios = computed(() => this.$state().data);
  loading = computed(() => this.$state().loading);

  http = inject(HttpClient);
  baseUrl = `${environment.baseUrl}/api/usuarios`;

  usuario: Usuario | null = null;

  constructor() {
    this.getAll();
  }

  /** Funciones de Login **/
  login(doc: string, clave: string) {
    return this.http.post(`${this.baseUrl}/login`, {
      documento: doc,
      clave: clave
    })
  }

  isLogged(): boolean {
    return localStorage.getItem('idUser') ? true : false;
  }

  getAll(estado: 'T' | 'S' | 'N' = 'T') {
    this.$state.set({ loading: true, data: [] });
    this.http.get(this.baseUrl, { params: { estado: estado } })
      .pipe(delay(500))
      .subscribe({
        next: (res: any) => {
          console.log(res);

          if (res?.isSuccess) {
            this.$state.set({ loading: false, data: res.data });
          } else {
            this.$state.set({ loading: false, data: [], error: res?.mensaje || 'Error al obtener usuarios' });
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  get(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  add(formulario: FormGroup<any>) {
    const body = {
      documento: formulario.get("documento")?.value,
      nombres: formulario.get("nombres")?.value,
      ape_materno: formulario.get("ape_materno")?.value,
      ape_paterno: formulario.get("ape_paterno")?.value,
      telefono: formulario.get("telefono")?.value,
      correo: formulario.get("correo")?.value,
      fecha_nac: formulario.get("fecha_nac")?.value,
      clave: formulario.get("clave")?.value,
      cod_rol: formulario.get("cod_rol")?.value,
    }
    return this.http.post(`${this.baseUrl}`, body);
  }

  eliminar(id: number | undefined, estado: string) {
    const url = `${this.baseUrl}/${id}`;
    const body = {
      activo: estado
    }
    return this.http.patch(url, body);
  }

}
