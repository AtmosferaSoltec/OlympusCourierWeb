import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosService } from '../../pagos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Reparto } from '../../../../interfaces/reparto';
import { MostrarContenidoPipe } from "../../../../pipes/mostrar-contenido.pipe";
import { FormatNumPipe } from "../../../../pipes/format-num.pipe";

@Component({
    selector: 'app-tabla-repartos-seleccionados',
    standalone: true,
    templateUrl: './tabla-repartos-seleccionados.component.html',
    imports: [
        CommonModule, MatIconModule, MatButtonModule,
        MatTooltipModule, MostrarContenidoPipe,
        FormatNumPipe
    ]
})
export class TablaRepartosSeleccionadosComponent {
  pagosService = inject(PagosService)

  quitarReparto(item: Reparto) {
    this.pagosService.quitarItem(item);
  }

  getTotal(): number {
    let total = 0;
    this.pagosService.listRepartosSeleccionados().forEach((item: Reparto) => {
      if (item.total) {
        total += item.total;
      }
    })
    return total;
  }

}
