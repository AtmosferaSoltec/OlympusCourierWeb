import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarFecha',
  standalone: true
})
export class MostrarFechaPipe implements PipeTransform {

  transform(value: string | undefined, mostrarHora: boolean = false): unknown {
    if (!value) {
      return 'Sin Fecha';
    }
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    let fechaFormateada = `${day}/${month}/${year}`;

    if (mostrarHora) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      fechaFormateada += ` ${hours}:${minutes}`;
    }

    return fechaFormateada;
  }

}
