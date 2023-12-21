import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosService } from '../../pagos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MostrarIDPipe } from "../../../../pipes/mostrar-id.pipe";
import { Reparto } from '../../../../interfaces/reparto';
import { MostrarContenidoPipe } from "../../../../pipes/mostrar-contenido.pipe";

@Component({
  selector: 'app-tabla-repartos-seleccionados',
  standalone: true,
  templateUrl: './tabla-repartos-seleccionados.component.html',
  styleUrl: './tabla-repartos-seleccionados.component.scss',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MostrarIDPipe, MostrarContenidoPipe]
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
