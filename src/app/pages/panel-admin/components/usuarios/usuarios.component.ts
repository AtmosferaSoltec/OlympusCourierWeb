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

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.length > 0) {
      this.panelAdminService.listUsuarios = this.panelAdminService.listUsuariosTotal.filter(objeto =>
        objeto.nombres?.toLowerCase().includes(inputValue.toLowerCase())
      );
    } else {
      this.panelAdminService.listUsuarios = this.panelAdminService.listUsuariosTotal;
    }
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

  eliminar(item: Usuario, estado: string) {
    let texto = "";
    if (estado == "N"){
      texto = "Se eliminara este usuario!"
    }else if(estado === "S"){
      texto = "Se restaurara este usuario!"
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
        this.panelAdminService.eliminarUsuario(item, estado)
      }
    });
  }

}
