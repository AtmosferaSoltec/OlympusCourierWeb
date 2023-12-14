import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdminService } from '../../panel-admin.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Distrito } from '../../../../interfaces/distrito';
import { DialogDistritosComponent } from '../dialogs/dialog-distritos/dialog-distritos.component';
import Swal from 'sweetalert2';
import { MostrarFechaPipe } from "../../../../pipes/mostrar-fecha.pipe";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DistritoService } from '../../../../services/distrito.service';

@Component({
  selector: 'app-destinos',
  standalone: true,
  templateUrl: './distritos.component.html',
  styleUrl: './distritos.component.scss',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MostrarFechaPipe, ReactiveFormsModule]
})
export class DestinosComponent {

  panelAdminService = inject(PanelAdminService)
  distritoService = inject(DistritoService)

  dialog = inject(MatDialog)

  estado = new FormControl('T');

  openDialog(item: Distrito | null = null) {
    const dialogRef = this.dialog.open(DialogDistritosComponent, {
      data: item,
      width: "770px"
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  eliminar(item: Distrito, estado: string) {
    let texto = "";
    if (estado == "N") {
      texto = "Se eliminara este distrito!"
    } else if (estado === "S") {
      texto = "Se restaurara este distrito!"
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
        this.panelAdminService.eliminarDistrito(item, estado)
      }
    });
  }

}
