import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../interfaces/usuario';
import { FormGroup } from '@angular/forms';
import { State } from '../interfaces/state';
import { delay, firstValueFrom } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  $state = signal<State<Usuario[]>>({ loading: false, data: [] });
  public listUsuarios = computed(() => this.$state().data);
  loading = computed(() => this.$state().loading);

  http = inject(HttpClient);
  token = inject(TokenService).token();
  baseUrl = `${environment.baseUrl}/api/usuarios`;

  usuario = signal<Usuario | undefined>(undefined)

  constructor() {
    this.getAll();
    this.validarSesion()
  }

  validarSesion() {
    this.http.get(`${this.baseUrl}/verificarToken`, { headers: { 'Authorization': `${this.token}` } })
      .subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.usuario.set(res.data);

          } else {
            console.log(res?.mensaje);
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  /** Funciones de Login **/
  login(doc: string, clave: string) {
    return this.http.post(`${this.baseUrl}/login`, {
      documento: doc,
      clave: clave
    })
  }

  async isLogged(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (token) {
      const call: any = await firstValueFrom(this.http.get(`${this.baseUrl}/verificarToken`, { headers: { 'Authorization': `${token}` } }));
      return call?.isSuccess;
    } else {
      return false;
    }
  }

  getAll(estado: 'S' | 'N' | 'T' = 'S') {
    this.$state.set({ loading: true, data: [] });
    this.http.get(this.baseUrl, { params: { estado: estado }, headers: { 'Authorization': `${this.token}` } })
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
  }

  get(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  add(formulario: any) {
    const body = {
      documento: formulario.documento,
      nombres: formulario.nombres,
      ape_paterno: formulario.ape_paterno,
      ape_materno: formulario.ape_materno,
      telefono: formulario.telefono,
      correo: formulario.correo,
      fecha_nac: formulario.fecha_nac ?? '1999-01-01',
      clave: formulario.clave,
      cod_rol: formulario.cod_rol
    }
    return this.http.post(`${this.baseUrl}`, body, { headers: { 'Authorization': `${this.token}` } });
  }


  update(id: number, value: any) {
    value.id = id;
    return this.http.put(this.baseUrl, value, { headers: { 'Authorization': `${this.token}` } });
  }

  eliminar(id: number | undefined, estado: string) {
    const url = `${this.baseUrl}/${id}`;
    const body = {
      activo: estado
    }
    return this.http.patch(url, body, { headers: { 'Authorization': `${this.token}` } });
  }


  cambiarPass(pass_anterior: string, pass_nueva: string) {
    const headers = { 'Authorization': `${this.token}` };
    return this.http.post(`${this.baseUrl}/cambiarPass`, { pass_anterior, pass_nueva }, { headers: headers })
  }

}
