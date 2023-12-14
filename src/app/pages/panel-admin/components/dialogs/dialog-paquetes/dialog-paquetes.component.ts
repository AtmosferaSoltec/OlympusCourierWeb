import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { Usuario } from '../../../../../interfaces/usuario';
import { DialogUsuarioComponent } from '../dialog-usuario/dialog-usuario.component';
import { TipoPaquete } from '../../../../../interfaces/tipo-paquete';
import { PanelAdminService } from '../../../panel-admin.service';
import { PaqueteService } from '../../../../../services/paquete.service';
import Swal from 'sweetalert2';

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
  private panelService = inject(PanelAdminService);
  private paqueteService = inject(PaqueteService);

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
    if (this.formulario.valid) {
      this.paqueteService.add(this.formulario.get('nombre')?.value).subscribe({
        next: (data: any) => {
          if (data?.isSuccess){
            Swal.fire({
              title: "Insertado!",
              text: "Tipo de paquete insertado.",
              icon: "success",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#047CC4",
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close()
              }
            });

          }else{
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
    }
  }
}
