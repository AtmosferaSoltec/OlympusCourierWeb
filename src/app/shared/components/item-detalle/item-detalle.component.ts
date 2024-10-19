import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-detalle',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './item-detalle.component.html',
})
export class ItemDetalleComponent {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() text?: string;
}
