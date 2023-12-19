import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  const isLogged = await usuarioService.isLogged();
  if (isLogged) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};