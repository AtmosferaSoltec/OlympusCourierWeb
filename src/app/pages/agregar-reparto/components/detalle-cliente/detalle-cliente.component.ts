import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetalleComponent } from '../../../../shared/components/item-detalle/item-detalle.component';
import { BotonComponent } from '../../../../components/boton/boton.component';
import { AgregarRepartoService } from '../../agregar-reparto.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../../../../components/dialog-add-cliente/dialog-add-cliente.component';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-detalle-cliente',
  standalone: true,
  imports: [CommonModule, ItemDetalleComponent, BotonComponent],
  templateUrl: './detalle-cliente.component.html',
})
export class DetalleClienteComponent {
  service = inject(AgregarRepartoService);

  clienteService = inject(ClienteService);

  borrar() {
    this.service.client.set(null);
  }
}
