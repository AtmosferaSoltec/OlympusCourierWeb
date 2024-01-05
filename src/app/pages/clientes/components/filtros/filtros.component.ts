import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RepartosService } from '../../../repartos/repartos.service';
import { BotonComponent } from '../../../../components/boton/boton.component';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, MatIconModule, BotonComponent, ReactiveFormsModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent {

  clientesService = inject(ClientesService)
  router = inject(Router)

  formulario: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      estado: ['S'],
      tipo_doc: ['T'],
      doc: [''],
      cliente: [''],
    })
  }

  filtrar() {
    const form = this.formulario.value;
    const query = {
      estado: form.estado,
      tipo_doc: form.tipo_doc,
      doc: form.doc,
      cliente: form.cliente
    }
    this.clientesService.listarClientes(query)
  }

  toAgregar() {
    this.clientesService.openDialogCliente();
  }
}
