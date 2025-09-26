import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-item-detalle',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="flex flex-row items-center gap-2 text-lg">
      <mat-icon class="text-textos">{{ icon }}</mat-icon>
      <span class="text-textos">{{ label }}</span>
      <span>{{ text | uppercase }}</span>
    </div>
  `,
})
export class ItemDetalleComponent {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() text?: string;
}
