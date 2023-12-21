import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RepartoService } from '../../services/reparto.service';
import Swal from 'sweetalert2';
import { GlobalService } from '../../services/global.service';
import { RepartosService } from './repartos.service';

@Component({
  selector: 'app-repartos',
  standalone: true,
  imports: [
    CommonModule, FiltrosComponent, TablaComponent,
    MatButtonModule, MatTooltipModule,
  ],
  templateUrl: './repartos.component.html',
  styleUrl: './repartos.component.scss'
})
export class RepartosComponent {

  repartosService = inject(RepartosService)
  globalService = inject(GlobalService)


  exportar() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se exportará la información de los repartos a un archivo Excel",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        const listRepartos = this.repartosService.listRepartos();
        if (!listRepartos) {
          Swal.fire(
            '¡Error!',
            'No se encontró ningún reparto.',
            'error'
          )
          return;
        }

        const listItems: any[] = []
        listRepartos.forEach((reparto) => {
          reparto.items?.forEach((item) => {
            listItems.push(item)
          })
        })

        this.globalService.exportarVariasListas([
          {
            data: listRepartos,
            nombreHoja: 'REPARTOS'
          },
          {
            data: listItems,
            nombreHoja: 'ITEMS'
          }
        ], 'REPARTOS')

        Swal.fire(
          '¡Exportado!',
          'La información ha sido exportada.',
          'success'
        )
      }
    });
  }

}
