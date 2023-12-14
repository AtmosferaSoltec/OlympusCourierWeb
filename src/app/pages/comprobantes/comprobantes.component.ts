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
    this.comprobanteService.getAll({
      estado: this.formulario.get('estado')?.value,
      metodoPago: this.formulario.get('metodoPago')?.value,
      tipoDoc: this.formulario.get('tipoDoc')?.value,
      idUser: this.formulario.get('idUser')?.value
    })
  }
}
