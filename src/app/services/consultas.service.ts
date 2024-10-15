import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { Result } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  http = inject(HttpClient);
  url = `${environment.baseUrl}/api/consultas`;

  async searchDoc(doc: string, tipoDoc: string) {
    const call = this.http.get(`${this.url}/${tipoDoc}/${doc}`);
    const res: Result = await firstValueFrom(call);
    if (res?.isSuccess) {
      return res.data
    } else {
      alert(res?.mensaje)
      return null;
    }
  }

}
