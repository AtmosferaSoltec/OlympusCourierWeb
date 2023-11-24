import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/usuarios`;

  login(doc:string, clave:string) {
    return this.http.post(`${this.url}/login`, {
      documento: doc,
      clave: clave
    })
  }
  
  isLogged(): boolean {
    return localStorage.getItem('idUser') ? true : false;
  }

}
