import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { TipoPaquete } from '../../../../interfaces/tipo-paquete';
import { DialogPaquetesComponent } from '../dialogs/dialog-paquetes/dialog-paquetes.component';
import Swal from 'sweetalert2';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PaqueteService } from '../../../../services/paquete.service';
import { MostrarActivoPipe } from "../../../../pipes/mostrar-activo.pipe";

@Component({
  selector: 'app-paquetes',
  standalone: true,
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.scss',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, ReactiveFormsModule, MostrarActivoPipe]
})
export class PaquetesComponent {

  estado = new FormControl('T');
  paqueteService = inject(PaqueteService)
  dialog = inject(MatDialog)

  ngOnInit(): void {
    this.estado.valueChanges
      .subscribe({
        next: (valor: any) => {
          if (!valor) {
            return;
          }
          this.paqueteService.getAll(valor);
        }
      })
  }

  openDialog(item: TipoPaquete | null = null) {
    const dialogRef = this.dialog.open(DialogPaquetesComponent, {
      data: item,
      width: "770px"
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }


  eliminar(item: TipoPaquete, estado: string) {
    let texto = "";
    if (estado == "N") {
      texto = "Se eliminara este paquete!"
    } else if (estado === "S") {
      texto = "Se restaurara este paquete!"
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
        this.paqueteService.eliminar(item.id, estado).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              let title = estado === "N" ? "Eliminado!" : "Restaurado!"
              let text = estado === "N" ? "El paquete ha sido eliminado." : "El paquete ha sido restaurado."
              Swal.fire({
                title: title,
                text: text,
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "#047CC4",
              })
              // Actualizar la lista de distritos
              this.paqueteService.getAll();
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
