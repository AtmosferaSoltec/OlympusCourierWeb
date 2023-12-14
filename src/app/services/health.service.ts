import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private http: HttpClient) { }

  checkServerHealth() {
    return this.http.get('http://localhost:3000/health')
      .pipe(
        catchError(error => {
          console.error('El servidor está inactivo');
          return of(null);
        })
      );
  }
}
