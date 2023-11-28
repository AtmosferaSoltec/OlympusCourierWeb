import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Documento } from '../../../../models/documento';
import { Distrito } from '../../../../models/distrito';
import { Usuario } from '../../../../models/usuario';
import { DistritoService } from '../../../../services/distrito.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { DocumentoService } from '../../../../services/documento.service';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {

  formulario: FormGroup;

  listTipoDocumento: Documento[] = [];
  listDistrito: Distrito[] = [];
  listUsuario: Usuario[] = [];

  private fb = inject(FormBuilder)
  distritoService = inject(DistritoService);
  usuarioService = inject(UsuarioService);
  documentoService = inject(DocumentoService);

  constructor() {

    this.formulario = this.fb.group({
      tipoDoc: [''],
      doc: [''],
      nombres: [''],
      usuarios: [''],
      distritos: [''],
      tipoComprobante: [''],
      estado: [''],
    })

    this.documentoService.getAll().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listTipoDocumento = data.data;
        }
      }
    });
    this.usuarioService.getAll().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listUsuario = data.data;
        }
      }
    });
    this.distritoService.listarDestinos().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listDistrito = data.data;
        }
      }
    });
  }


  filtrar() {
    console.log(this.formulario.value);

  }
}
