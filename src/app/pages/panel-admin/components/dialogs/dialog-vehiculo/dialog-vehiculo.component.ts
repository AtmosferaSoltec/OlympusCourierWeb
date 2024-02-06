import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../../../../services/vehiculo.service';
import { Vehiculo } from '../../../../../interfaces/vehiculo';

@Component({
  selector: 'app-dialog-vehiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-vehiculo.component.html',
  styleUrl: './dialog-vehiculo.component.scss'
})
export class DialogVehiculoComponent {
  formulario: FormGroup;

  private fb = inject(FormBuilder);
  private vehiculoService = inject(VehiculoService);

  constructor(
    public dialogRef: MatDialogRef<DialogVehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehiculo | undefined
  ) {

    this.formulario = this.fb.group({
      nombre: [this.data?.nombre || '', [Validators.required]],
    })

  }

  closeDialog() {
    this.dialogRef.close();
  }

  guardar() {
    if (this.formulario.valid) {
      //Verificar si es nuevo o editar
      if (this.data?.id) {
        this.vehiculoService.update(this.data?.id, this.formulario.get('nombre')?.value).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              Swal.fire({
                title: "Actualizado!",
                text: "Vehiculo actualizado.",
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "#047CC4",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close(true)
                }
                //this.vehiculoService.listarMetodosPago()
              });

            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data?.mensaje || 'Error al actualizar',
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#047CC4",
              });
            }
          },
          error: (err: any) => console.log(err?.message)

        })
      } else {
        this.vehiculoService.add(this.formulario.get('nombre')?.value).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              Swal.fire({
                title: "Insertado!",
                text: "Tipo Vehiculo insertado.",
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "#047CC4",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close(true)
                }
                //this.vehiculoService.listarMetodosPago()
              });

            } else {
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
}
