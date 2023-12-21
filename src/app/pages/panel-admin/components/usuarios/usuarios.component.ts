import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Usuario } from '../../../../interfaces/usuario';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsuarioComponent } from '../dialogs/dialog-usuario/dialog-usuario.component';
import Swal from 'sweetalert2';
import { MostrarRolPipe } from "../../../../pipes/mostrar-rol.pipe";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { MostrarActivoPipe } from "../../../../pipes/mostrar-activo.pipe";
import { FormatTelfPipe } from "../../../../pipes/format-telf.pipe";
import { PanelAdminService } from '../../panel-admin.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MostrarRolPipe, ReactiveFormsModule, MostrarActivoPipe, FormatTelfPipe]
})
export class UsuariosComponent {

  formulario: FormGroup;

  panelAdminService = inject(PanelAdminService)
  dialog = inject(MatDialog)

  constructor(
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      estado: ['S']
    })
  }

  filtrar() {
    this.panelAdminService.listarUsuarios(this.formulario.value.estado)
  }

  openDialog(item: Usuario | undefined = undefined) {
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      data: item,
      width: "770px"
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.panelAdminService.guardarUsuario(item?.id, res)
        }
      }
    });

  }

  eliminar(item: Usuario, estado: 'S' | 'N') {
    let texto = "";
    if (estado == "N") {
      texto = "Se eliminara este usuario!"
    } else if (estado === "S") {
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
        if (!item.id) {
          return alert("No se pudo eliminar el usuario");
        }
        this.panelAdminService.setEstadoUsuario(item.id, estado)
      }
    });
  }

}
