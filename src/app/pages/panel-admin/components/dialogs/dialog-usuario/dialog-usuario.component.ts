import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../../interfaces/usuario';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-dialog-usuario',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, ReactiveFormsModule,
    MatIconModule, MatRadioModule
  ],
  templateUrl: './dialog-usuario.component.html',
  styleUrl: './dialog-usuario.component.scss'
})
export class DialogUsuarioComponent {

  formulario = new FormGroup({
    documento: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
    nombres: new FormControl('', Validators.required),
    ape_paterno: new FormControl(''),
    ape_materno: new FormControl(''),
    telefono: new FormControl('', [Validators.maxLength(9)]),
    correo: new FormControl(''),
    fecha_nac: new FormControl(''),
    clave: new FormControl('', Validators.required),
    cod_rol: new FormControl('U', Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario | undefined
  ) {
  }

  buscarDoc() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  guardar() {
    const controls = this.formulario.value;


    const fecha_nac = controls.fecha_nac;
    if (!fecha_nac || fecha_nac.toString().length < 10) {
      alert('Fecha invalida')
      return;
    }

    const telefono = controls.telefono;
    if (!telefono || telefono.toString().length < 9 || isNaN(Number(telefono))) {
      alert('Telefono invalido')
      return;
    }

    //this.dialogRef.close(this.formulario.value)
  }
}
