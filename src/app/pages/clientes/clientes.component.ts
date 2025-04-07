import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { GlobalService } from '../../services/global.service';
import { TituloComponent } from '../../components/titulo/titulo.component';
import { Cliente } from '../../interfaces/cliente';
import { ClientesService } from './clientes.service';
import { DistritoService } from '../../services/distrito.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FiltrosComponent,
    TablaComponent,
    MatTooltipModule,
    TituloComponent,
  ],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  distritoService = inject(DistritoService);
  clienteService = inject(ClientesService);
  globalService = inject(GlobalService);


  ngOnInit(): void {
    this.distritoService.activo.set('S');
    this.distritoService.getAll();
  }

  exportar() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se exportará la información de los clientes a un archivo Excel',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        const listClientes = this.convertirListCompr(
          this.clienteService.listClientes() ?? []
        );
        if (!listClientes) {
          Swal.fire('¡Error!', 'No se encontró ningún cliente.', 'error');
          return;
        }

        console.log(listClientes);

        this.globalService.exportarList(listClientes, 'CLIENTES');
        Swal.fire(
          '¡Exportado!',
          'La información ha sido exportada.',
          'success'
        );
      }
    });
  }

  convertirListCompr(list: Cliente[]): any[] {
    const listExcel: any = [];
    list.forEach((cliente) => {
      let tipoDoc = '';
      if (cliente?.cod_tipodoc === '1') {
        tipoDoc = 'DNI';
      } else if (cliente?.cod_tipodoc === '6') {
        tipoDoc = 'RUC';
      } else if (cliente?.cod_tipodoc === '4') {
        tipoDoc = 'CE';
      } else {
        tipoDoc = 'OTRO';
      }
      const item = {
        TIPO_DOC: tipoDoc,
        NUM_DOC: cliente?.documento ?? '',
        NOMBRE: cliente?.nombres ?? '',
        DIRECCION: cliente?.direc ?? '',
        DISTRITO: cliente?.distrito ?? '',
        MAPS: cliente?.url_maps ?? '',
        CORREO: cliente?.correo ?? '',
        TELF: cliente?.telefono ?? '',
      };

      listExcel.push(item);
    });
    return listExcel;
  }
}
