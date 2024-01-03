import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../../../services/empresa.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comprobantes-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comprobantes-admin.component.html',
  styleUrl: './comprobantes-admin.component.scss'
})
export class ComprobantesAdminComponent implements OnInit {

  empresaService = inject(EmpresaService)

  formulario: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      ruta: [''],
      token: [''],
      serie_f: ['', [Validators.minLength(4), Validators.maxLength(4)]],
      num_f: [''],
      serie_b: ['', [Validators.minLength(4), Validators.maxLength(4)]],
      num_b: [''],
    })
  }

  ngOnInit(): void {
    this.empresaService.get()
    .subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          this.formulario.patchValue({
            ruta: res?.data?.ruta,
            token: res?.data?.token,
            serie_f: res?.data?.serie_f,
            num_f: res?.data?.num_f,
            serie_b: res?.data?.serie_b,
            num_b: res?.data?.num_b,
          })
        } else {
          console.log(res?.mensaje || "Error al obtener los datos del contador");
        }
      },
      error: (err: any) => {
        console.log(err.message);
      }
    })
  }

  guardarCambios() {
    if (this.formulario.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algunos campos son inválidos',
      });
      return;
    }

    this.empresaService.update(this.formulario.value).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Se guardaron los cambios correctamente',
          });
        } else {
          console.log(res?.mensaje || "Error al guardar los datos del contador");
        }
      },
      error: (err: any) => {
        console.log(err.message);
      }
    })
  }

}
