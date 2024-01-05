import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../../interfaces/usuario';
import { MatRadioModule } from '@angular/material/radio';
import { UsuarioService } from '../../../../../services/usuario.service';
import Swal from 'sweetalert2';
import { PanelAdminService } from '../../../panel-admin.service';

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

  formulario: FormGroup;

  usuarioService = inject(UsuarioService)
  panelService = inject(PanelAdminService)

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario | undefined
  ) {

    //Formulario
    this.formulario = this.fb.group({
      documento: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      nombres: ['', Validators.required],
      apellidos: [''],
      telefono: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      correo: [''],
      fecha_nac: [''],
      cod_rol: ['U']
    })

    if (data) {
      data.fecha_nac = data.fecha_nac?.split('T')[0];
      this.formulario.patchValue(data);
    }
  }


  closeDialog() {
    this.dialogRef.close();
  }

  numerico(event: any) {
    return /[0-9]/i.test(event.key)
  }

  guardar() {
    console.log('d');

    if (this.formulario.invalid) {
      alert("Complete los campos requeridos")
      return;
    }

    if (!this.data) {
      this.usuarioService.add(this.formulario.value).subscribe({
        next: (data) => {
          if (data?.isSuccess) {
            this.closeDialog();
            Swal.fire({
              title: "Insertado!",
              text: "Usuario insertado.",
              icon: "success",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#047CC4",
            })
            this.panelService.listarUsuarios()
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: data?.mensaje || 'Error al insertar',
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#047CC4",
            })
          }
        },
        error: (err: any) => {
          alert(err.message)
          console.log(err)
        }
      })
    } else {
      this.usuarioService.update(this.formulario.value, this.data.id)
        .subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              this.closeDialog();
              Swal.fire({
                title: "Actualizado!",
                text: "Usuario actualizado.",
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "#047CC4"
              })
              this.panelService.listarUsuarios()
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data?.mensaje || 'Error al actualizar',
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#047CC4"
              })
            }
          },
          error: (err) => {
            alert(err.message)
            console.log(err)
          }
        })
    }

  }
}
