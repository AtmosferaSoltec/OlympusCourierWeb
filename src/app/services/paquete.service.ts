import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/paquetes`;
  
  constructor() { }

  getAll(){
    return this.http.get(`${this.url}`)
  }
}
