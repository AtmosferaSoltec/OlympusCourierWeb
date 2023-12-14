import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {


  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/contador`;


  get() {
    return this.http.get(this.url);
  }

  update(value: any) {
    return this.http.put(`${this.url}/1`, value);
  }
}
