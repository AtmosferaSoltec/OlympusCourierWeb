import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../models/usuario';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  http = inject(HttpClient);
  baseUrl = `${environment.baseUrl}/api/usuarios`;

  usuario: Usuario | null = null;

  login(doc: string, clave: string) {
    return this.http.post(`${this.baseUrl}/login`, {
      documento: doc,
      clave: clave
    })
  }

  isLogged(): boolean {
    return localStorage.getItem('idUser') ? true : false;
  }

  getAll() {
    return this.http.get(`${this.baseUrl}`);
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
