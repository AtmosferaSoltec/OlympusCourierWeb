import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddClienteComponent } from '../../components/dialog-add-cliente/dialog-add-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GlobalService } from '../../services/global.service';
import { TituloComponent } from '../../components/titulo/titulo.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    FiltrosComponent, TablaComponent, MatTooltipModule,
    TituloComponent
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  clienteService = inject(ClienteService);
  globalService = inject(GlobalService)

  exportar() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se exportará la información de los clientes a un archivo Excel",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        const listClientes = this.clienteService.listClientes();
        if (!listClientes) {
          Swal.fire(
            '¡Error!',
            'No se encontró ningún cliente.',
            'error'
          )
          return;
        }
        this.globalService.exportarList(listClientes, 'CLIENTES');
        Swal.fire(
          '¡Exportado!',
          'La información ha sido exportada.',
          'success'
        )
      }
    });
  }
}
