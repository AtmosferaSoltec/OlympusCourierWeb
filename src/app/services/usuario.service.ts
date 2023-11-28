import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/usuarios`;

  usuario: Usuario | null = null;

  login(doc: string, clave: string) {
    return this.http.post(`${this.url}/login`, {
      documento: doc,
      clave: clave
    })
  }

  isLogged(): boolean {
    return localStorage.getItem('idUser') ? true : false;
  }

  getAll() {
    return this.http.get(`${this.url}`);
  }

  get(id: string) {
    return this.http.get(`${this.url}/${id}`)
  }

}
