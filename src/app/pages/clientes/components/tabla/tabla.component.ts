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
import Swal from 'sweetalert2';

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

    dialogRef.afterClosed().subscribe((data: any) => {
      this.clienteService.getAll()
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
        this.clienteService.delete(cliente.id, estado).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              let title = estado === "N" ? "Eliminado!" : "Restaurado!"
              let text = estado === "N" ? "Cliente eliminado." : "Cliente restaurado."
              Swal.fire({
                title: title,
                text: text,
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "#047CC4",
              })
              this.clienteService.getAll()
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data?.mensaje || 'Error al eliminar',
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#047CC4",
              });
            }
          },
          error: (err) => console.log(err)
        });
      }
    });
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
