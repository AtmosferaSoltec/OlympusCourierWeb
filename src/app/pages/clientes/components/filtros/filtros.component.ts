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
  usuarioService = inject(UsuarioService);
  clientesService = inject(ClientesService);
  router = inject(Router);

  filtrar() {
    this.clientesService.listarClientes();
  }

  toAgregar() {
    this.clientesService.openDialogCliente();
  }
}
