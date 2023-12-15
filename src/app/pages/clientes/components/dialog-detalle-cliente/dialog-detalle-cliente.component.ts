import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleItemComponent } from '../../../../components/detalle-item/detalle-item.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../../../interfaces/cliente';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MostrarTipoDocumentoPipe } from "../../../../pipes/mostrar-tipo-documento.pipe";
import { FormatTelfPipe } from "../../../../pipes/format-telf.pipe";
import { MostrarGeneroPipe } from "../../../../pipes/mostrar-genero.pipe";

@Component({
    selector: 'app-dialog-detalle-cliente',
    standalone: true,
    templateUrl: './dialog-detalle-cliente.component.html',
    styleUrl: './dialog-detalle-cliente.component.scss',
    imports: [
      CommonModule, DetalleItemComponent, MatIconModule,
      MatButtonModule, MatTooltipModule, MostrarTipoDocumentoPipe,
      FormatTelfPipe, MostrarGeneroPipe
    ]
})
export class DialogDetalleClienteComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogDetalleClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente | undefined
  ) {

  }

  close(){
    this.dialogRef.close()
  }
}
