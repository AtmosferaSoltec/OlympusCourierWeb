import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../../interfaces/usuario';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-dialog-usuario',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatIconModule, MatRadioModule],
  templateUrl: './dialog-usuario.component.html',
  styleUrl: './dialog-usuario.component.scss'
})
export class DialogUsuarioComponent {

  documento = new FormControl('', Validators.required)
  nombres = new FormControl('', Validators.required)
  ape_paterno = new FormControl('')
  ape_materno = new FormControl('')
  telefono = new FormControl('')
  correo = new FormControl('')
  fecha_nac = new FormControl('')
  clave = new FormControl('', Validators.required)
  cod_rol = new FormControl('U', Validators.required)

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


    //Validar si el documento tiene 8 digitos

    if (this.documento.value || this.nombres.value || this.ape_paterno.value || this.ape_materno.value || this.telefono.value || this.correo.value || this.fecha_nac.value || this.clave.value || this.cod_rol.value) {
      alert("Debe ingresar todos los campos")
      return
    }

    if (this.documento.value?.length != 8) {
      alert("El documento debe tener 8 digitos")
      return
    }

    //Debe ingresar un nombre
    if (!this.nombres.value?.length) {
      alert("Debe ingresar un nombre")
      return
    }

    //Di ingresa correo, debe ser un correo valido
    if (this.correo.value?.length && !this.correo.value?.includes("@")) {
      alert("Debe ingresar un correo valido")
      return
    }

    //Si ingresa telefono, debe ser un telefono valido
    if (this.telefono.value?.length && this.telefono.value?.length != 9) {
      alert("Debe ingresar un telefono valido")
      return
    }

    //Si ingresa fecha de nacimiento, debe ser una fecha valida
    if (this.fecha_nac.value?.length && this.fecha_nac.value?.length != 10) {
      alert("Debe ingresar una fecha valida")
      return
    }

    //Si ingresa clave, debe ser una clave valida
    if (this.clave.value?.length && this.clave.value?.length <= 4) {
      alert("La clave debe tener minimo 4 caracteres")
      return
    }

    this.dialogRef.close()
    //this.dialogRef.close(this.formulario.value)



  }
}
