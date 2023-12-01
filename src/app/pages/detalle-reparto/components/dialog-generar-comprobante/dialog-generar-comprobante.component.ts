import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reparto } from '../../../../models/reparto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetalleRepartoService } from '../../detalle-reparto.service';
import { Documento } from '../../../../models/documento';
import { DocumentoService } from '../../../../services/documento.service';

@Component({
  selector: 'app-dialog-generar-comprobante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-generar-comprobante.component.html',
  styleUrl: './dialog-generar-comprobante.component.scss'
})
export class DialogGenerarComprobanteComponent {

  formulario: FormGroup
  tipoDocumentoService = inject(DocumentoService)
  listTipoDoc: Documento[] = []

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogGenerarComprobanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reparto | undefined
  ) {
    this.formulario = this.fb.group({
      tipoComprobante: ['2', [Validators.required]],
      tipoDoc: ['1', [Validators.required]],
      documento: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      direc: ['', [Validators.required]],
      telefono: [''],
      correo: [''],
    });

    this.obtenerTipodocumentos()
  }

  obtenerTipodocumentos() {
    this.tipoDocumentoService.getAll().subscribe({
      next: (data: any) => {
        if(data?.isSuccess){
          this.listTipoDoc = data.data
        }else{
          console.log(data?.mensaje || 'Error al obtener tipo documentos');
        }
      },
      error: (err) => console.log(err)
    })
  }

  close() {
    this.dialogRef.close()
  }


  guardar() {
    if (this.formulario.valid) { }
  }
}
