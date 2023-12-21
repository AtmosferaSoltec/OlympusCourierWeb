import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../../interfaces/usuario';
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
  private panelAdminService = inject(PanelAdminService);

  listDocumento: any[] = []
  listDistritos: any[] = []


  constructor(
    private fb: FormBuilder,
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
      fecha_nac: [this.data?.fecha_nac ? new Date(this.data.fecha_nac).toISOString().split('T')[0] : '',],
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
      this.dialogRef.close(this.formulario.value)
    } else {
      console.log(this.formulario.value);
    }
  }
}
