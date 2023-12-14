import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { Distrito } from '../../interfaces/distrito';
import { DistritoService } from '../../services/distrito.service';
import { Cliente } from '../../interfaces/cliente';
import { MenuSelectComponent } from '../menu-select/menu-select.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DocumentoService } from '../../services/documento.service';
import { ConsultasService } from '../../services/consultas.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-add-cliente',
  standalone: true,
  imports: [CommonModule, MenuSelectComponent, ReactiveFormsModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './dialog-add-cliente.component.html',
  styleUrl: './dialog-add-cliente.component.scss'
})
export class DialogAddClienteComponent {
  formulario: FormGroup
  clienteService = inject(ClienteService);
  selectedDistrito: any;
  listDistritos = this.distritoService.listDistritos();

  documentoService = inject(DocumentoService)
  consultasService = inject(ConsultasService)

  constructor(
    public dialogRef: MatDialogRef<DialogAddClienteComponent>,
    private distritoService: DistritoService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Cliente | undefined,
  ) {

    this.formulario = this.fb.group({
      tipo: [data?.cod_tipodoc ? data.cod_tipodoc : '1', [Validators.required]],
      doc: [data?.documento, [Validators.required, Validators.minLength(8)]],
      nombres: [data?.nombres, [Validators.required, Validators.maxLength(100)]],
      cel: [data?.telefono, [Validators.required, Validators.minLength(9)]],
      genero: [data?.genero ? data.genero : 'S'],
      correo: [data?.correo, Validators.email],
      distrito: [data?.id_distrito, [Validators.required]],
      direc: [data?.direc, [Validators.required, Validators.maxLength(100)]],
      ref: [data?.referencia],
      maps: [data?.url_maps],
    })
  }

  progressBuscarDoc: boolean = false;

  buscarDoc() {
    this.progressBuscarDoc = true;
    const doc = this.formulario.get('doc')
    const tipo = this.formulario.get('tipo')
    if (doc?.valid) {
      if (tipo?.value == 1) {
        this.consultasService.searchDni(doc.value).subscribe({
          next: (data: any) => {
            if (data?.datos) {
              this.formulario.get('nombres')?.setValue(`${data.datos.nombres} ${data.datos.apellidoPaterno} ${data.datos.nombres}`);
              this.formulario.get('direc')?.setValue('');
            }
            this.progressBuscarDoc = false;
          },
          error: (err) => {
            console.log(err);
            this.progressBuscarDoc = false;
          }
        })
      }

      if (tipo?.value == 6) {
        this.consultasService.searchRuc(doc.value).subscribe({
          next: (data: any) => {
            if (data?.datos) {
              this.formulario.get('nombres')?.setValue(`${data.datos.razonSocial}`);
              this.formulario.get('direc')?.setValue(`${data.datos.direccion}`);
            }
            this.progressBuscarDoc = false;
          },
          error: (err) => {
            console.log(err);
            this.progressBuscarDoc = false;
          }
        })
      }
    } else {
      this.progressBuscarDoc = false;
    }
  }

  resetDoc() {
    this.formulario.get('doc')?.reset();
  }

  getMaxLength(): number {
    const tipo = this.formulario.get('tipo')?.value;
    if (tipo == 1) {
      return 8;
    } else if (tipo == 6) {
      return 11;
    } else {
      return 12;
    }
  }

  async guardar() {
    if (this.formulario.valid) {
      const body = {
        cod_tipodoc: this.formulario.get('tipo')?.value,
        documento: this.formulario.get('doc')?.value,
        nombres: this.formulario.get('nombres')?.value,
        telefono: this.formulario.get('cel')?.value,
        genero: this.formulario.get('genero')?.value,
        correo: this.formulario.get('correo')?.value,
        id_distrito: this.formulario.get('distrito')?.value,
        direc: this.formulario.get('direc')?.value,
        referencia: this.formulario.get('ref')?.value,
        url_maps: this.formulario.get('maps')?.value,
      };
      if (this.data == undefined) {
        this.clienteService.addCliente(body).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              this.dialogRef.close(data.data);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error al insertar',
                text: data?.mensaje,
              })
            }
          },
          error: err => console.log(err)
        });
      } else {
        this.clienteService.updateCliente(body, this.data?.id).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              this.dialogRef.close(this.data?.id);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                text: data?.mensaje,
              })
            }
          },
          error: err => console.log(err)
        });
      }
    } else {
      Swal.fire({
        title: 'Error de Validación',
        text: 'Por favor, complete todos los campos requeridos',
        icon: 'question',
        customClass: {
          confirmButton: 'btn-alert',
        },
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#05ACD7',
        confirmButtonAriaLabel: '#FFF'
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
