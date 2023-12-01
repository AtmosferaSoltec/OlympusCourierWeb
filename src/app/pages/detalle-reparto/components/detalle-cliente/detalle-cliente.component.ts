import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reparto } from '../../../../models/reparto';
import { Cliente } from '../../../../models/cliente';

@Component({
  selector: 'app-detalle-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-cliente.component.html',
  styleUrl: './detalle-cliente.component.scss'
})
export class DetalleClienteComponent {
  
  @Input() cliente : Cliente | undefined

}
