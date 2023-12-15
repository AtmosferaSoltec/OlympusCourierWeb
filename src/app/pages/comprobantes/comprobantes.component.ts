import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ComprobanteService } from '../../services/comprobante.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MostrarTipoDocumentoPipe } from "../../pipes/mostrar-tipo-documento.pipe";
import { UsuarioService } from '../../services/usuario.service';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { MostrarMetodoPagoPipe } from "../../pipes/mostrar-metodo-pago.pipe";
import { DocumentoService } from '../../services/documento.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-comprobantes',
  standalone: true,
  templateUrl: './comprobantes.component.html',
  styleUrl: './comprobantes.component.scss',
  imports: [CommonModule, MatIconModule, MatButtonModule,
    MatMenuModule, MatTooltipModule, MostrarTipoDocumentoPipe, MostrarMetodoPagoPipe, ReactiveFormsModule]
})
export class ComprobantesComponent {

  comprobanteService = inject(ComprobanteService)
  usuarioService = inject(UsuarioService)
  metodoPagoService = inject(MetodoPagoService)
  tipoDocumentoService = inject(DocumentoService)
  globalService = inject(GlobalService)

  formulario: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      estado: ['T'],
      metodoPago: ['T'],
      tipoDoc: ['T'],
      idUser: ['T'],
    })
  }

  buscarUsuario(id?: number): string {
    if (!id) {
      return 'Desconocido';
    }

    const usuario = this.usuarioService.listUsuarios()?.find(u => u.id === id);

    if (!usuario) {
      return 'Desconocido';
    } else {
      return `${usuario.nombres}`
    }

  }


  filtrarComprobantes() {
    const id_ruc = localStorage.getItem('ruc');
    if (!id_ruc) throw new Error('No se encontró el ruc del usuario');

    this.comprobanteService.getAll({
      estado: this.formulario.get('estado')?.value,
      metodoPago: this.formulario.get('metodoPago')?.value,
      tipoDoc: this.formulario.get('tipoDoc')?.value,
      idUser: this.formulario.get('idUser')?.value,
      id_ruc: id_ruc
    })
  }

  exportar() {
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se exportará la información de los comprobantes a un archivo Excel",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        const listClientes = this.comprobanteService.listComprobantes();
        if (!listClientes) {
          Swal.fire(
            '¡Error!',
            'No se encontró ningún cliente.',
            'error'
          )
          return;
        }
        this.globalService.exportarList(listClientes, 'COMPROBANTES');
        Swal.fire(
          '¡Exportado!',
          'La información ha sido exportada.',
          'success'
        )
      }
    });
  }
}
