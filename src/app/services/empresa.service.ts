import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {


  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/empresa`;


  get() {
    return this.http.get(this.url);
  }

  update(formulario: any) {
    const body = {
      ruta: formulario.ruta,
      token: formulario.token,
      serie_f: formulario.serie_f,
      num_f: formulario.num_f,
      serie_b: formulario.serie_b,
      num_b: formulario.num_b,
    }
    return this.http.put(this.url, body);
  }
}
