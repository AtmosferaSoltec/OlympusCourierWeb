import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from '../../../../components/boton/boton.component';
import { AgregarRepartoService } from '../../agregar-reparto.service';
import { ClienteService } from '../../../../services/cliente.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalle-cliente',
  standalone: true,
  imports: [CommonModule, MatIconModule, BotonComponent],
  templateUrl: './detalle-cliente.component.html',
})
export class DetalleClienteComponent {
  service = inject(AgregarRepartoService);

  clienteService = inject(ClienteService);

  borrar() {
    this.service.client.set(null);
  }
}
