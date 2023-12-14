import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarID',
  standalone: true
})
export class MostrarIDPipe implements PipeTransform {

  transform(id: number | undefined): string {
    if (!id) {
      return 'Sin ID';
    }
    const idStr = id?.toString().slice(0, 6).padStart(6, '0');
    return `#${idStr}`;
  }

}
