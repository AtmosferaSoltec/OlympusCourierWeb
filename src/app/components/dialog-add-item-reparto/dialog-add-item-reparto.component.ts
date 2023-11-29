import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemReparto } from '../../models/item-reparto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InputBoxComponent } from '../../shared/components/input-box/input-box.component';
import { PaqueteService } from '../../services/paquete.service';

@Component({
  selector: 'app-dialog-add-item-reparto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, InputBoxComponent],
  templateUrl: './dialog-add-item-reparto.component.html',
  styleUrl: './dialog-add-item-reparto.component.css'
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
      nGuia: [data?.num_guia || '', []],
      tipoPaquete: [data?.id_tipo_paquete || 0, [Validators.required]],
      descrip: [data?.detalle || '', []],
      cant: [data?.cant || '', [Validators.required, Validators.min(1)]],
      precio: [data?.precio || '', [Validators.required, Validators.min(1)]]
    })

    this.paqueteService.getAll().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listTipoPaquete = data.data;
          if (!this.data?.id_tipo_paquete && this.listTipoPaquete?.length > 0) {
            this.formulario.get('tipoPaquete')?.setValue(this.listTipoPaquete[0].id)
          }
        } else {
          console.log(data.mensaje ? data.mensaje : 'No se pudo obtener datos');
        }
      },
      error(err) {
        console.log(err);

      },
    })
  }

  listTipoPaquete: any[] = []


  closeDialog() {
    this.dialogRef.close();
  }

  onAceptar() {

    const itemReparto: ItemReparto = {
      num_guia: this.formulario.get('nGuia')?.value || 'Sin Guia',
      id_tipo_paquete: this.formulario.get('tipoPaquete')?.value || '',
      detalle: this.formulario.get('descrip')?.value || 'Sin Descripción',
      precio: this.formulario.get('precio')?.value || 0.0,
      cant: this.formulario.get('cant')?.value || 0,
    };

    this.dialogRef.close(itemReparto)

  }
}
