import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNum',
  standalone: true
})
export class FormatNumPipe implements PipeTransform {

  transform(num?: number, cant: number = 8): string {
    //Devolver en formato 0000000001
    if (num) {
      return num.toString().padStart(cant, '0');
    } else {
      return 'Sin Valor';
    }
  }

}
