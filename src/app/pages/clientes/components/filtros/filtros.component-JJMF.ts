import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  formulario = new FormGroup({
    estado: new FormControl<string>('T'),
    tipo_doc: new FormControl<string>('T'),
    doc: new FormControl<string>(''),
    cliente: new FormControl<string>('')
  })

  filtrar() {
    const controls = this.formulario.controls;
    const params = {
      estado: controls.estado.value,
      tipo_doc: controls.tipo_doc.value,
      doc: controls.doc.value,
      cliente: controls.cliente.value
    }
    this.clientesService.listarClientes(params)
  }

  toAgregar() {
    this.clientesService.openDialogCliente();
  }
}
