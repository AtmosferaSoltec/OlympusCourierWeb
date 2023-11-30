import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdminService } from '../../panel-admin.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { TipoPaquete } from '../../../../models/tipo-paquete';
import { DialogPaquetesComponent } from '../dialogs/dialog-paquetes/dialog-paquetes.component';

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css'
})
export class PaquetesComponent {

  panelAdminService = inject(PanelAdminService)
  dialog = inject(MatDialog)

  openDialog(item: TipoPaquete | null = null) {
    const dialogRef = this.dialog.open(DialogPaquetesComponent, {
      data: item,
      width: "770px"
    })

  }
}
