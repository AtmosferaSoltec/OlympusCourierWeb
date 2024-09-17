import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalle-cliente',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './detalle-cliente.component.html'
})
export class DetalleClienteComponent {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() text?: string;
}
