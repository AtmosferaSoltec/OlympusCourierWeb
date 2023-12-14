import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Documento } from '../../../../interfaces/documento';
import { Distrito } from '../../../../interfaces/distrito';
import { Usuario } from '../../../../interfaces/usuario';
import { DistritoService } from '../../../../services/distrito.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { DocumentoService } from '../../../../services/documento.service';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent {

  formulario: FormGroup;

  private fb = inject(FormBuilder)
  distritoService = inject(DistritoService);
  usuarioService = inject(UsuarioService);
  documentoService = inject(DocumentoService);

  listTipoDocumento: Documento[] = [];
  listDistrito = this.distritoService.listDistritos();
  listUsuario = this.usuarioService.listUsuarios();

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
  }


  filtrar() {
    console.log(this.formulario.value);

  }
}
