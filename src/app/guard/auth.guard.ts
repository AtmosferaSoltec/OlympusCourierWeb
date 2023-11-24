import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLogged = inject(UsuarioService).isLogged();

  if (isLogged) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};