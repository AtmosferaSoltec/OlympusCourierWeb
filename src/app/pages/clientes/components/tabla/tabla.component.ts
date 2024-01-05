import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../../../../interfaces/cliente';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../../../../components/dialog-add-cliente/dialog-add-cliente.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MostrarTipoDocumentoPipe } from "../../../../pipes/mostrar-tipo-documento.pipe";
import { FormatTelfPipe } from "../../../../pipes/format-telf.pipe";
import { UsuarioService } from '../../../../services/usuario.service';
import { MatMenuModule } from '@angular/material/menu';
import Swal from 'sweetalert2';
import { ClientesService } from '../../clientes.service';
import { MostrarActivoPipe } from "../../../../pipes/mostrar-activo.pipe";

@Component({
    selector: 'app-tabla',
    standalone: true,
    templateUrl: './tabla.component.html',
    styleUrl: './tabla.component.scss',
    imports: [CommonModule, MatButtonModule, MatIconModule,
        MatTooltipModule, MostrarTipoDocumentoPipe, FormatTelfPipe, MatMenuModule, MostrarActivoPipe]
})
export class TablaComponent {
  usuarioService = inject(UsuarioService);
  clientesService = inject(ClientesService);

  dialog = inject(MatDialog);

  editCliente(item: Cliente) {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      data: item,
      width: "950px"
    })

    dialogRef.afterClosed().subscribe((data: any) => {
      this.clientesService.listarClientes()
    });

  }

  eliminar(cliente: Cliente, estado: 'S' | 'N') {
    let texto = "";
    if (estado == "N") {
      texto = "Se eliminara este cliente!"
    } else if (estado === "S") {
      texto = "Se restaurara este cliente!"
    }
    Swal.fire({
      title: "¿Estas seguro?",
      text: texto,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#047CC4",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!cliente.id) {
          alert('No se encontró el id del cliente');
          return;
        }
        this.clientesService.setEstado(cliente.id, estado)
      }
    });
  }

}
