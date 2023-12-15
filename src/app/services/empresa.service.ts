import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {


  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/empresa`;


  get() {
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');
    return this.http.get(this.url, { params: { id_ruc } });
  }

  update(formulario: any) {

    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');

    const body = {
      id_ruc,
      ruta: formulario.ruta,
      token: formulario.token,
      serie_f: formulario.serie_f,
      num_f: formulario.num_f,
      serie_b: formulario.serie_b,
      num_b: formulario.num_b,
    }
    console.log(body);
    
    return this.http.put(this.url, body);
  }
}
