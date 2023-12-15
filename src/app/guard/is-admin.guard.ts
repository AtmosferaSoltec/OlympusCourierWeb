import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanActivateFn = async (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  const idUser = localStorage.getItem('idUser');

  if (!idUser) {
    router.navigate(['/login']);
    return false;
  }

  const id = Number(idUser);
  const usuario: any = await firstValueFrom(usuarioService.get(id));
  if (usuario?.data?.cod_rol === 'A') {
    return true;
  } else {
    router.navigate(['/menu/repartos']);
    return false;
  }
};
