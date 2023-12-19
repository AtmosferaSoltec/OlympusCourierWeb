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

  $state = signal<State<Usuario[]>>({ loading: false, data: [] });
  public listUsuarios = computed(() => this.$state().data);
  loading = computed(() => this.$state().loading);

  http = inject(HttpClient);
  baseUrl = `${environment.baseUrl}/api/usuarios`;

  usuario = signal<Usuario | undefined>(undefined)

  constructor() {
    this.getAll();
    const id = Number(localStorage.getItem('idUser'));
    if (id) {
      this.get(id).subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.usuario.set(res.data);
          }
        }
      })
    }
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
    const id_ruc = localStorage.getItem('ruc');
    if (id_ruc) {
      this.http.get(this.baseUrl, { params: { estado: estado, id_ruc } })
        .pipe(delay(500))
        .subscribe({
          next: (res: any) => {
            if (res?.isSuccess) {
              console.log(res.data);
              this.$state.set({ loading: false, data: res.data });
            } else {
              console.log(res?.mensaje);
              this.$state.set({ loading: false, data: [], error: res?.mensaje || 'Error al obtener usuarios' });
            }
          },
          error: (err: any) => {
            console.log(err);
          }
        })
    };
  }

  get(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  add(formulario: any) {

    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');

    const body = {
      documento: formulario.documento,
      nombres: formulario.nombres,
      ape_paterno: formulario.ape_paterno,
      ape_materno: formulario.ape_materno,
      telefono: formulario.telefono,
      correo: formulario.correo,
      fecha_nac: formulario.fecha_nac ?? '1999-01-01',
      clave: formulario.clave,
      cod_rol: formulario.cod_rol,
      id_ruc
    }
    return this.http.post(`${this.baseUrl}`, body);
  }


  update(id: number, value: any) {
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    value.id_ruc = id_ruc;
    value.id = id;
    return this.http.put(this.baseUrl, value);
  }

  eliminar(id: number | undefined, estado: string) {
    const url = `${this.baseUrl}/${id}`;
    const body = {
      activo: estado
    }
    return this.http.patch(url, body);
  }


  cambiarPass(id: string | null, pass_anterior: string, pass_nueva: string) {
    return this.http.post(`${this.baseUrl}/cambiarPass`, { id, pass_anterior, pass_nueva })
  }

}
