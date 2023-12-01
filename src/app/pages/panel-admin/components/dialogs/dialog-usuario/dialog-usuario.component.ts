import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../../models/usuario';
import { MatRadioModule } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../../../services/usuario.service';
import { PanelAdminService } from '../../../panel-admin.service';

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
  private panelService = inject(PanelAdminService);
  private usuarioService = inject(UsuarioService);

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
      ape_materno: [this.data?.ape_materno || ''],
      telefono: [this.data?.telefono || '', [Validators.required]],
      correo: [this.data?.correo || ''],
      fecha_nac: [this.data?.fecha_nac || '',],
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
    if (this.formulario.valid) {
      this.usuarioService.add(this.formulario).subscribe({
        next: (data: any) => {
          if (data?.isSuccess){
            Swal.fire({
              title: "Insertado!",
              text: "Usuario insertado.",
              icon: "success",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#047CC4",
            }).then((result) => {
              if (result.isConfirmed) {
                this.panelService.obtenerUsuarios()
                this.dialogRef.close()
              }
            });

          }else{
            console.log(data?.mensaje);
            
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: data?.mensaje || 'Error al insertar',
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#047CC4",
            });
          }
        },
        error: (err) => console.log(err)
      })
    }else{
      console.log(this.formulario.value);
      
    }
  }
}
