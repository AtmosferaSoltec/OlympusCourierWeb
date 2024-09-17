import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemReparto } from '../../interfaces/item-reparto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaqueteService } from '../../services/paquete.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-item-reparto',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './dialog-add-item-reparto.component.html',
  styleUrl: './dialog-add-item-reparto.component.scss',
})
export class DialogAddItemRepartoComponent {
  paqueteService = inject(PaqueteService);

  num_guia = '';
  precio = '';
  adicional = '';
  clave = '';
  detalle = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAddItemRepartoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemReparto | undefined
  ) {
    if (data) {
      console.log(data);
      this.num_guia = data.num_guia ?? '';
      this.precio = data.precio ? data.precio.toString() : '';
      this.adicional = data.adicional ? data.adicional.toString() : '';
      this.clave = data.clave ?? '';
      this.detalle = data.detalle ?? '';
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onAceptar() {
    if (isNaN(Number(this.precio)) || Number(this.precio) < 1) {
      Swal.fire('Error', 'El precio debe ser un número mayor a 0', 'error');
      return;
    }

    //Validar si el adicional no esta vacio, si no esta validar si el valor es numero y mayor a 1
    if (
      this.adicional &&
      (isNaN(Number(this.adicional)) || Number(this.adicional) < 1)
    ) {
      Swal.fire('Error', 'El adicional debe ser un número mayor a 0', 'error');
      return;
    }

    //Validar si el detalle no esta vacio
    if (!this.detalle) {
      Swal.fire('Error', 'El detalle no puede estar vacio', 'error');
      return;
    }

    //Validar si la clave tiene 4 caracteres
    if (this.clave.length !== 4) {
      Swal.fire('Error', 'La clave debe tener 4 caracteres', 'error');
      return;
    }

    const itemReparto: ItemReparto = {
      num_guia: this.num_guia,
      precio: Number(this.precio),
      adicional: Number(this.adicional),
      clave: this.clave,
      detalle: this.detalle,
    };

    this.dialogRef.close(itemReparto);
  }
}
