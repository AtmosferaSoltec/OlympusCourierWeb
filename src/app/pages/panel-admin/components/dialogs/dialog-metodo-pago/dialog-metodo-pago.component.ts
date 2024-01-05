import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MetodoPagoService } from '../../../../../services/metodo-pago.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MetodoPago } from '../../../../../interfaces/metodo-pago';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-metodo-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-metodo-pago.component.html',
  styleUrl: './dialog-metodo-pago.component.scss'
})
export class DialogMetodoPagoComponent {
  formulario: FormGroup;

  private fb = inject(FormBuilder);
  private metodoPagoService = inject(MetodoPagoService);

  constructor(
    public dialogRef: MatDialogRef<DialogMetodoPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MetodoPago | undefined
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
        this.metodoPagoService.update(this.data?.id, this.formulario.get('nombre')?.value).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              Swal.fire({
                title: "Actualizado!",
                text: "Metodo de pago actualizado.",
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "#047CC4",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close()
                }
                this.metodoPagoService.listarMetodosPago()
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
        this.metodoPagoService.add(this.formulario.get('nombre')?.value).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              Swal.fire({
                title: "Insertado!",
                text: "Metodo de pago insertado.",
                icon: "success",
                confirmButtonText: "Continuar",
                confirmButtonColor: "#047CC4",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close()
                }
                this.metodoPagoService.listarMetodosPago()
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
