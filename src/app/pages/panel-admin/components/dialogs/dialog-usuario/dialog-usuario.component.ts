import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../../models/usuario';

@Component({
  selector: 'app-dialog-usuario',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './dialog-usuario.component.html',
  styleUrl: './dialog-usuario.component.css'
})
export class DialogUsuarioComponent {

  formulario: FormGroup;
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DialogUsuarioComponent>);
  @Inject(MAT_DIALOG_DATA) public data: Usuario | undefined;

  listDocumento: any[] = []
  listDistritos: any[] = []

  constructor(
  ) {

    this.formulario = this.fb.group({
      tipo: [this.data?.documento || '', [Validators.required]],
    })
  }
  buscarDoc() {

  }

  closeDialog() {

  }
  guardar() {

  }
}
