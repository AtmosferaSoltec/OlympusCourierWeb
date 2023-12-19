import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dialog-cambiar-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-cambiar-pass.component.html',
  styleUrl: './dialog-cambiar-pass.component.scss'
})
export class DialogCambiarPassComponent {

  usuarioService = inject(UsuarioService);
  formulario: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCambiarPassComponent>,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      passAnterior: [''],
      passNueva: [''],
      passNuevaConfirmar: ['']
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async guardar() {

    const passAnterior = this.formulario.get('passAnterior')?.value;
    const passNueva = this.formulario.get('passNueva')?.value;
    const passNuevaConfirmar = this.formulario.get('passNuevaConfirmar')?.value;

    //Verificar que los campos no esten vacios
    if (passAnterior == '' || passNueva == '' || passNuevaConfirmar == '') {
      Swal.fire({
        title: "Error!",
        text: "Todos los campos son obligatorios.",
        icon: "error",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#047CC4",
      })
      return;
    }

    //Verificar que las contraseñas coincidan
    if (passNueva != passNuevaConfirmar) {
      Swal.fire({
        title: "Error!",
        text: "Las contraseñas no coinciden.",
        icon: "error",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#047CC4",
      })
      return;
    }
    //Verificar que la contraseña nueva no sea igual a la anterior
    if (passAnterior == passNueva) {
      Swal.fire({
        title: "Error!",
        text: "La contraseña nueva no puede ser igual a la anterior.",
        icon: "error",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#047CC4",
      })
      return;
    }

    this.usuarioService.cambiarPass(passAnterior, passNueva).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          Swal.fire({
            title: "Éxito!",
            text: "Contraseña cambiada correctamente.",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#047CC4",
          })
          this.closeDialog();
        } else {
          Swal.fire({
            title: "Error!",
            text: res?.mensaje || 'Erroddddr al cambiar contraseña.',
            icon: "error",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#047CC4",
          })
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
