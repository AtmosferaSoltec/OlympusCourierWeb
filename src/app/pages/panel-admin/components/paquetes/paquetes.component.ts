import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdminService } from '../../panel-admin.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { TipoPaquete } from '../../../../models/tipo-paquete';
import { DialogPaquetesComponent } from '../dialogs/dialog-paquetes/dialog-paquetes.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.scss'
})
export class PaquetesComponent {

  panelAdminService = inject(PanelAdminService)
  dialog = inject(MatDialog)

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.length > 0) {
      this.panelAdminService.listPaquetes = this.panelAdminService.listPaquetesTotal.filter(objeto =>
        objeto.nombre?.toLowerCase().includes(inputValue.toLowerCase())
      );
    } else {
      this.panelAdminService.listPaquetes = this.panelAdminService.listPaquetesTotal;
    }
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
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se eliminara este tipo de paquete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar!",
      confirmButtonColor: "#047CC4",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        this.panelAdminService.eliminarTipoPaquete(item)
      }
    });
  }
}
