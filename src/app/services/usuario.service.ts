import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Result } from '../interfaces/state';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  http = inject(HttpClient);
  baseUrl = `${environment.baseUrl}/api/usuarios`;

  usuario = signal<Usuario | undefined>(undefined);

  validarSesion() {
    this.http.get<Result>(`${this.baseUrl}/verificarToken`).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          this.usuario.set(res.data);
        } else {
          console.log(res?.mensaje);
        }
      },
      error: (err: any) => {
        alert(err.message);
        console.log(err);
      },
    });
  }

  /** Funciones de Login **/
  login(doc: string, clave: string) {
    return this.http.post<Result>(`${this.baseUrl}/login`, {
      documento: doc,
      clave: clave,
    });
  }

  async isLogged(): Promise<boolean> {
    const call = this.http.get(`${this.baseUrl}/verificarToken`);
    const res: any = await firstValueFrom(call);
    return res?.isSuccess;
  }

  getAll(params: any) {
    return this.http.get<Result>(this.baseUrl, { params: params });
  }

  get(id: number) {
    return this.http.get<Result>(`${this.baseUrl}/${id}`);
  }

  add(form: any) {
    return this.http.post<Result>(`${this.baseUrl}`, form);
  }

  update(form: any, id_usuario?: number) {
    return this.http.put<Result>(`${this.baseUrl}/${id_usuario}`, form);
  }

  delete(id: number | undefined, estado: string) {
    const url = `${this.baseUrl}/${id}`;
    const body = {
      activo: estado,
    };
    return this.http.patch<Result>(url, body);
  }

  cambiarPass(pass_anterior: string, pass_nueva: string) {
    return this.http.post<Result>(`${this.baseUrl}/cambiarPass`, {
      pass_anterior,
      pass_nueva,
    });
  }
}
