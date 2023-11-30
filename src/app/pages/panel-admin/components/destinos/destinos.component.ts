import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdminService } from '../../panel-admin.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Distrito } from '../../../../models/distrito';
import { DialogDistritosComponent } from '../dialogs/dialog-distritos/dialog-distritos.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destinos',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './destinos.component.html',
  styleUrl: './destinos.component.scss'
})
export class DestinosComponent {

  panelAdminService = inject(PanelAdminService)
  dialog = inject(MatDialog)

  openDialog(item: Distrito | null = null) {
    const dialogRef = this.dialog.open(DialogDistritosComponent, {
      data: item,
      width: "770px"
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  eliminar(item: Distrito) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se eliminara este distrito!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar!",
      confirmButtonColor: "#047CC4",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        this.panelAdminService.eliminarDistrito(item)
      }
    });
  }

}
