import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    this.getToken();
  }

  token = signal<string | null>(null);

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      
      this.token.set(token);
    } else {
      this.token.set(null);
    }
  }
}
