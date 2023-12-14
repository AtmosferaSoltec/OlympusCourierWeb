import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarRol',
  standalone: true
})
export class MostrarRolPipe implements PipeTransform {

  transform(rol: string | undefined): string {
    if (!rol) {
      return 'Sin rol';
    }
    switch (rol) {
      case 'A': return 'Admin';
      case 'S': return 'Super Usuario';
      case 'U': return 'Usuario';
      case 'D': return 'Delivery';
      default: return 'Sin rol';
    }
  }

}
