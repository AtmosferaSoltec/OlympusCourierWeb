import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { Usuario } from '../../../../../models/usuario';
import { DialogUsuarioComponent } from '../dialog-usuario/dialog-usuario.component';
import { TipoPaquete } from '../../../../../models/tipo-paquete';

@Component({
  selector: 'app-dialog-paquetes',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatIconModule, MatRadioModule],
  templateUrl: './dialog-paquetes.component.html',
  styleUrl: './dialog-paquetes.component.scss'
})
export class DialogPaquetesComponent {

  formulario: FormGroup;
  private fb = inject(FormBuilder);

  listDocumento: any[] = []
  listDistritos: any[] = []

  constructor(
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoPaquete | undefined
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
