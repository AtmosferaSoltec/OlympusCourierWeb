import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PanelAdminService } from '../../panel-admin.service';
import { Usuario } from '../../../../models/usuario';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsuarioComponent } from '../dialogs/dialog-usuario/dialog-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  panelAdminService = inject(PanelAdminService)
  dialog = inject(MatDialog)

  constructor(){
    this.openDialog()
  }

  openDialog(item: Usuario | null = null) {
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      data: item,
      width: "770px"
    })

  }

}
