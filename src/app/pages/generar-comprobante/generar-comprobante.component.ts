import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generar-comprobante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generar-comprobante.component.html',
  styleUrl: './generar-comprobante.component.css'
})
export class GenerarComprobanteComponent {

  activeButton = 1;

  toggleButton(buttonNumber: number) {
    this.activeButton = buttonNumber;
  }
}
