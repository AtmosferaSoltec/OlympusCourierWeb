import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RepartosService } from '../../../repartos/repartos.service';
import { BotonComponent } from '../../../../components/boton/boton.component';
import { ClientesService } from '../../clientes.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { ClienteFiltro } from '../../../../services/cliente.service';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, MatIconModule, BotonComponent, ReactiveFormsModule],
  templateUrl: './filtros.component.html',
})
export class FiltrosComponent {
  uuarioService = inject(UsuarioService);
  clientesService = inject(ClientesService);
  router = inject(Router);

  form = new FormGroup({
    estado: new FormControl('S'),
    tipo_doc: new FormControl('0'),
    doc: new FormControl(''),
    cliente: new FormControl(''),
    limit: new FormControl('20'),
  });

  filtrar() {
    const form = this.form.value;
    const query = {
      estado: form.estado,
      tipo_doc: form.tipo_doc,
      doc: form.doc,
      cliente: form.cliente,
    };
    const filtros: ClienteFiltro = {
      activo: form.estado,
      tipo_doc: form.tipo_doc,
      documento: form.doc,
      limit: form.limit,
    };
    this.clientesService.listarClientes(filtros);
  }

  toAgregar() {
    this.clientesService.openDialogCliente();
  }
}
