import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PanelAdminService } from '../../panel-admin.service';
import { Usuario } from '../../../../models/usuario';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsuarioComponent } from '../dialogs/dialog-usuario/dialog-usuario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  panelAdminService = inject(PanelAdminService)
  dialog = inject(MatDialog)

  constructor() {
    this.openDialog()
  }

  openDialog(item: Usuario | undefined = undefined) {

    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      data: item,
      width: "770px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  eliminar(item: Usuario) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se eliminara este usuario!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar!",
      confirmButtonColor: "#047CC4",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "Usuario eliminado.",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#047CC4",
        });
      }
    });
  }

}
