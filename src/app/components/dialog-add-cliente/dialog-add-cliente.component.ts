import { Component, Inject, OnInit, inject, signal } from '@angular/core';
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
export class DialogAddClienteComponent implements OnInit {
  formulario: FormGroup
  clienteService = inject(ClienteService);
  selectedDistrito: any;

  documentoService = inject(DocumentoService)
  consultasService = inject(ConsultasService)
  distritoService = inject(DistritoService)

  constructor(
    public dialogRef: MatDialogRef<DialogAddClienteComponent>,
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
      distrito: [data?.id_distrito ?? 1, [Validators.required]],
      direc: [data?.direc, [Validators.required, Validators.maxLength(100)]],
      ref: [data?.referencia],
      maps: [data?.url_maps],
    })
  }
  ngOnInit(): void {
    this.distritoService.getAll('S')
  }

  progressBuscarDoc = signal<boolean>(false);

  async buscarDoc() {
    this.progressBuscarDoc.set(true);
    const doc = this.formulario.get('doc')
    const tipo = this.formulario.get('tipo')
    if (doc?.valid) {
      if (tipo?.value == 1) {
        const data: any = this.consultasService.searchDoc(doc.value, 'dni')
        this.formulario.get('nombres')?.setValue(`${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`);
        this.formulario.get('direc')?.setValue('');
      }
      if (tipo?.value == 6) {
        const data: any = this.consultasService.searchDoc(doc.value, 'ruc')
        this.formulario.get('nombres')?.setValue(`${data.razonSocial}`);
        this.formulario.get('direc')?.setValue(`${data.direccion}`);
      }
    }
    this.progressBuscarDoc.set(false);
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

  guardar() {
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
              Swal.fire({
                icon: 'success',
                title: 'Cliente registrado',
                text: data?.mensaje
              })
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
              Swal.fire({
                icon: 'success',
                title: 'Cliente actualizado',
                text: data?.mensaje
              })
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
      let error = '';
      if (this.formulario.get('tipo')?.invalid) {
        error += 'Tipo de documento, ';
      }
      if (this.formulario.get('doc')?.invalid) {
        error += 'Documento, ';
      }
      if (this.formulario.get('nombres')?.invalid) {
        error += 'Nombres, ';
      }
      if (this.formulario.get('cel')?.invalid) {
        error += 'Celular, ';
      }
      if (this.formulario.get('distrito')?.invalid) {
        error += 'Distrito, ';
      }
      if (this.formulario.get('direc')?.invalid) {
        error += 'Dirección, ';
      }
      error = error.slice(0, -2);
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: `Los siguientes campos son obligatorios: ${error}`,
      })
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
