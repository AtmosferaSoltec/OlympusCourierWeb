import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-item.component.html'
})
export class DetalleItemComponent {

  @Input() title: string | null = '';
  @Input() descrip: any = '';
}
