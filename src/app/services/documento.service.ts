import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, first, map, of } from 'rxjs';
import { Distrito } from '../interfaces/distrito';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  http = inject(HttpClient);
  token = inject(TokenService).token();
  url = `${environment.baseUrl}/api/documento`;

  getAll(): Observable<Distrito[]> {
    return this.http.get<any>(this.url);
  }

  getAll2(): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(this.url).pipe(
      catchError(error => {
        console.error('Error al obtener los distritos', error);
        return of([]);
      }),
      map(response => response as Distrito[]),
      first()
    );
  }
}
