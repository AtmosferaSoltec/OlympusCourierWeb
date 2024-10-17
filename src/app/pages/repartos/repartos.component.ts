import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { GlobalService } from '../../services/global.service';
import { RepartosService } from './repartos.service';
import { PagerComponent } from "./components/pager/pager.component";
import { TotalesComponent } from "./components/totales/totales.component";

@Component({
  selector: 'app-repartos',
  standalone: true,
  imports: [
    CommonModule, FiltrosComponent, TablaComponent,
    MatButtonModule, MatTooltipModule,
    PagerComponent,
    TotalesComponent
],
  templateUrl: './repartos.component.html'
})
export class RepartosComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.repartosService.reset()
  }

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
        const listRepartos = this.repartosService.listRepartosNew();
        if (!listRepartos) {
          Swal.fire(
            '¡Error!',
            'No se encontró ningún reparto.',
            'error'
          )
          return;
        }


        this.globalService.exportarListRepartos(listRepartos)

        Swal.fire(
          '¡Exportado!',
          'La información ha sido exportada.',
          'success'
        )
      }
    });
  }

  
}
