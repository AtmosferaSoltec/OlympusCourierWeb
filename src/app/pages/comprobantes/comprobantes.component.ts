import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { GlobalService } from '../../services/global.service';
import { TituloComponent } from '../../components/titulo/titulo.component';
import { ComprobantesService } from './comprobantes.service';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';

@Component({
  selector: 'app-comprobantes',
  standalone: true,
  templateUrl: './comprobantes.component.html',
  styleUrl: './comprobantes.component.scss',
  imports: [
    CommonModule, MatButtonModule, TituloComponent,
    FiltrosComponent, TablaComponent
  ]
})
export class ComprobantesComponent {

  comprobantesService = inject(ComprobantesService)
  globalService = inject(GlobalService)

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
        const listClientes = this.comprobantesService.listComprobantes();
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
