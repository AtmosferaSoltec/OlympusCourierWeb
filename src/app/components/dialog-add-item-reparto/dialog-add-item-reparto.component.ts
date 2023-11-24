import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemReparto } from '../../models/item-reparto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InputBoxComponent } from '../../shared/components/input-box/input-box.component';

@Component({
  selector: 'app-dialog-add-item-reparto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, InputBoxComponent],
  templateUrl: './dialog-add-item-reparto.component.html',
  styleUrl: './dialog-add-item-reparto.component.css'
})
export class DialogAddItemRepartoComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAddItemRepartoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemReparto | undefined,
  ) {

    this.nGuia.valueChanges.subscribe(() => this.updateFormValidity());
    this.cat.valueChanges.subscribe(() => this.updateFormValidity());
    this.descrip.valueChanges.subscribe(() => this.updateFormValidity());
    this.cant.valueChanges.subscribe(() => this.updateFormValidity());
    this.precio.valueChanges.subscribe(() => this.updateFormValidity());
  }

  updateFormValidity() {
    this.formValid = this.nGuia.valid && this.cat.valid && this.descrip.valid && this.cant.valid && this.precio.valid;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  formValid = false;

  nGuia = new FormControl(this.data?.nGuia);
  cat = new FormControl(this.data?.cat, Validators.required);
  descrip = new FormControl(this.data?.descrip);
  cant = new FormControl(this.data?.cant, [Validators.required, Validators.min(1)]);
  precio = new FormControl(this.data?.precio, [Validators.required, Validators.min(1)]);

  onAceptar() {
    const itemReparto: ItemReparto = {
      nGuia: this.nGuia.value ? this.nGuia.value : 'Sin Guia',
      cat: this.cat.value ? this.cat.value : '',
      descrip: this.descrip.value ? this.descrip.value : 'Sin Descripción',
      precio: this.precio.value ? this.precio.value : 0.0,
      cant: this.cant.value ? this.cant.value : 0,
    }
    this.dialogRef.close(itemReparto)
  }
}
