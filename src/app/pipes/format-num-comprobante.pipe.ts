import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumComprobante',
  standalone: true
})
export class FormatNumComprobantePipe implements PipeTransform {

  transform(num: number): string {
    //Devolver en formato 0000000001
    if (num) {
      return num.toString().padStart(8, '0');
    }else{
      return 'Sin Valor';
    }
  }

}
