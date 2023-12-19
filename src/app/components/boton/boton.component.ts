import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-boton',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.scss'
})
export class BotonComponent {
  @Input() text: string = '';
  @Input() icon?: string;
  @Input() type: string = 'button';
  @Input() color: 'Principal' | 'Secundario' | 'Terciario' = 'Principal';
  @Input() witdh: string = 'w-28';
  @Output() clickEvent = new EventEmitter<void>();
}
