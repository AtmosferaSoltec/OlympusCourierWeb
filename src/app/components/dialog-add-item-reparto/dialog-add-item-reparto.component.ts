import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemReparto } from '../../interfaces/item-reparto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InputBoxComponent } from '../../shared/components/input-box/input-box.component';
import { PaqueteService } from '../../services/paquete.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-item-reparto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, InputBoxComponent],
  templateUrl: './dialog-add-item-reparto.component.html',
  styleUrl: './dialog-add-item-reparto.component.scss'
})
export class DialogAddItemRepartoComponent {

  formulario: FormGroup


  paqueteService = inject(PaqueteService)

  constructor(
    public dialogRef: MatDialogRef<DialogAddItemRepartoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemReparto | undefined,
    private fb: FormBuilder
  ) {

    this.formulario = this.fb.group({
      num_guia: [data?.num_guia || '', []],
      id_tipo_paquete: [data?.id_tipo_paquete || 1, [Validators.required]],
      detalle: [data?.detalle || '', []],
      cant: [data?.cant || '', [Validators.required, Validators.min(1)]],
      precio: [data?.precio || '', [Validators.required, Validators.min(1)]]
    })
  }


  closeDialog() {
    this.dialogRef.close();
  }

  onAceptar() {
    if (this.formulario.valid) {
      const itemReparto: ItemReparto = {
        num_guia: this.formulario.get('num_guia')?.value || 'Sin Guia',
        id_tipo_paquete: this.formulario.get('id_tipo_paquete')?.value || '',
        detalle: this.formulario.get('detalle')?.value || 'Sin Descripción',
        precio: this.formulario.get('precio')?.value || 0.0,
        cant: this.formulario.get('cant')?.value || 0,
      };
      this.dialogRef.close(itemReparto)
    } else {
      let error = 'Faltan completar campos'
      if (this.formulario.get('cant')?.invalid) {
        error = 'Cantidad'
      }
      if (this.formulario.get('precio')?.invalid) {
        error = 'Precio'
      }
      if (this.formulario.get('id_tipo_paquete')?.invalid) {
        error = 'Tipo de paquete'
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Los siguientes campos son obligatorios: ${error}`,
      })
    }

  }
}
