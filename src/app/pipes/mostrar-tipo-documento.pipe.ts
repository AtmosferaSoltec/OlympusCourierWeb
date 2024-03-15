import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarTipoDocumento',
  standalone: true
})
export class MostrarTipoDocumentoPipe implements PipeTransform {

  transform(value?: string): string {
    switch (value) {
      case "1":
        return 'DNI';
      case "6":
        return 'RUC';
      case "4":
        return 'CE';
      default:
        return 'Desconocido';
    }
  }

}
