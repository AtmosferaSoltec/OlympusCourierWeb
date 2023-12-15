import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../../../../interfaces/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../../../../components/dialog-add-cliente/dialog-add-cliente.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MostrarTipoDocumentoPipe } from "../../../../pipes/mostrar-tipo-documento.pipe";
import { FormatTelfPipe } from "../../../../pipes/format-telf.pipe";
import { UsuarioService } from '../../../../services/usuario.service';
import { MatMenuModule } from '@angular/material/menu';
import { DialogDetalleClienteComponent } from '../dialog-detalle-cliente/dialog-detalle-cliente.component';

@Component({
  selector: 'app-tabla',
  standalone: true,
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss',
  imports: [CommonModule, MatButtonModule, MatIconModule,
    MatTooltipModule, MostrarTipoDocumentoPipe, FormatTelfPipe, MatMenuModule
  ]
})
export class TablaComponent {
  usuarioService = inject(UsuarioService);
  clienteService = inject(ClienteService);

  dialog = inject(MatDialog);

  editCliente(item: Cliente) {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      data: item,
      width: "950px"
    })

    dialogRef.afterClosed().subscribe((data: Cliente) => {
      if (data) {
      }
    });

  }

  eliminar(any: any, any2: any) {

  }


  openDetalle(item: Cliente) {
    const dialogRef = this.dialog.open(DialogDetalleClienteComponent, {
      data: item,
      width: "800px"
    })

    dialogRef.afterClosed().subscribe((data: Cliente) => {
      if (data) {

      }
    });
  }
}
