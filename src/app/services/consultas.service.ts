import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  http = inject(HttpClient);
  token = inject(TokenService).token();
  url = `${environment.baseUrl}/api/consultas`;

  searchDni(doc: string) {
    return this.http.get(`${this.url}/dni/${doc}`);
  }

  searchRuc(doc: string) {
    return this.http.get(`${this.url}/ruc/${doc}`);
  }

}
