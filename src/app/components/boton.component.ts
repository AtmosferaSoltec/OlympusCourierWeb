import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-boton',
  imports: [CommonModule, MatIconModule],
  template: `
    <button
      [ngClass]="{
        'text-white bg-p-700 hover:bg-p-600 active:bg-p-800':
          color === 'Principal',
        'text-black bg-gray-50 hover:bg-gray-100 active:bg-gray-200':
          color === 'Secundario',
      }"
      [class]="
        witdh +
        ' font-semibold py-2 rounded flex items-center justify-center gap-2 shadow-md'
      "
      [type]="type"
      (click)="clickEvent.emit()"
    >
      @if (icon) {
        <mat-icon>{{ icon }}</mat-icon>
      }
      {{ text }}
    </button>
  `,
})
export class BotonComponent {
  @Input() text: string = '';
  @Input() icon?: string;
  @Input() type: string = 'button';
  @Input() color: 'Principal' | 'Secundario' | 'Terciario' = 'Principal';
  @Input() witdh: string = 'w-28';
  @Output() clickEvent = new EventEmitter<void>();
}
