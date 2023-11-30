import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { Usuario } from '../../../../../models/usuario';
import { DialogUsuarioComponent } from '../dialog-usuario/dialog-usuario.component';
import { Distrito } from '../../../../../models/distrito';

@Component({
  selector: 'app-dialog-distritos',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatIconModule, MatRadioModule],
  templateUrl: './dialog-distritos.component.html',
  styleUrl: './dialog-distritos.component.scss'
})
export class DialogDistritosComponent {

  formulario: FormGroup;
  private fb = inject(FormBuilder);

  listDocumento: any[] = []
  listDistritos: any[] = []

  constructor(
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Distrito | undefined
  ) {

    this.formulario = this.fb.group({
      nombre: [this.data?.nombre || '', [Validators.required]],
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
