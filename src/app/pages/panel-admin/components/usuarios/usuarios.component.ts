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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MostrarRolPipe, ReactiveFormsModule]
})
export class UsuariosComponent implements OnInit {

  estado = new FormControl('T');

  usuariosService = inject(UsuarioService)
  dialog = inject(MatDialog)

  ngOnInit(): void {
    this.estado.valueChanges
      .subscribe({
        next: (valor: any) => {
          if (!valor) {
            return;
          }
          this.usuariosService.getAll(valor);
        }
      })
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
        this.usuariosService.eliminar(item.id, estado).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              Swal.fire({
                title: "Eliminado!",
                text: "Usuario eliminado.",
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "#047CC4",
              })
              this.usuariosService.getAll()
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

}
