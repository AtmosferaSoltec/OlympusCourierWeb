import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLogged = inject(ClienteService).isLogged();

  if (isLogged) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};