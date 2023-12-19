import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MetodoPagoService } from '../../../../services/metodo-pago.service';
import { MatDialog } from '@angular/material/dialog';
import { MetodoPago } from '../../../../interfaces/metodo-pago';
import { DialogMetodoPagoComponent } from '../dialogs/dialog-metodo-pago/dialog-metodo-pago.component';
import Swal from 'sweetalert2';
import { MostrarActivoPipe } from "../../../../pipes/mostrar-activo.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.scss',
  imports: [CommonModule, ReactiveFormsModule, MostrarActivoPipe, MatIconModule, MatButtonModule, MatTooltipModule]
})
export class MetodoPagoComponent {

  estado = new FormControl('A');
  metodoPagoService = inject(MetodoPagoService)
  dialog = inject(MatDialog)

  ngOnInit(): void {
    this.estado.valueChanges
      .subscribe({
        next: (valor: any) => {
          if (!valor) {
            return;
          }
          this.metodoPagoService.getAll(valor);
        }
      })
  }

  openDialog(item: MetodoPago | null = null) {
    const dialogRef = this.dialog.open(DialogMetodoPagoComponent, {
      data: item,
      width: "770px"
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }


  eliminar(item: MetodoPago, estado: string) {
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
        this.metodoPagoService.eliminar(item.id, estado).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              Swal.fire({
                title: "Eliminado!",
                text: "Tipo de paquete eliminado.",
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "#047CC4",
              })
              // Actualizar la lista de distritos
              this.metodoPagoService.getAll();
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
