import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-detalle-item',
    imports: [],
    templateUrl: './detalle-item.component.html'
})
export class DetalleItemComponent {

  @Input() title: string | null = '';
  @Input() descrip: any = '';
}
