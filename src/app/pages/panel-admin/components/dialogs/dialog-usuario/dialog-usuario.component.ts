import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../../models/usuario';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-dialog-usuario',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatIconModule, MatRadioModule],
  templateUrl: './dialog-usuario.component.html',
  styleUrl: './dialog-usuario.component.scss'
})
export class DialogUsuarioComponent {

  formulario: FormGroup;
  private fb = inject(FormBuilder);

  listDocumento: any[] = []
  listDistritos: any[] = []


  constructor(
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario | undefined
  ) {
    this.formulario = this.fb.group({
      documento: [this.data?.documento || '', [Validators.required]],
      nombres: [this.data?.nombres || '', [Validators.required]],
      ape_paterno: [this.data?.ape_paterno || '', [Validators.required]],
      ape_materno: [this.data?.ape_materno || '', [Validators.required]],
      telefono: [this.data?.telefono || '', [Validators.required]],
      correo: [this.data?.correo || '', [Validators.required]],
      fecha_nac: [this.data?.fecha_nac || '', [Validators.required]],
      clave: [this.data?.clave || '', [Validators.required]],
      cod_rol: [this.data?.cod_rol || '', [Validators.required]]
    })
  }

  buscarDoc() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  guardar() {
    this.dialogRef.close()
  }
}
