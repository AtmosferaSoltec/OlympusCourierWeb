import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PagosService } from '../../pagos.service';
import { MostrarActivoPipe } from "../../../../pipes/mostrar-activo.pipe";
import { MostrarIDPipe } from "../../../../pipes/mostrar-id.pipe";
import { Reparto } from '../../../../interfaces/reparto';
import { MostrarContenidoPipe } from "../../../../pipes/mostrar-contenido.pipe";

@Component({
  selector: 'app-tabla-repartos-encontrados',
  standalone: true,
  templateUrl: './tabla-repartos-encontrados.component.html',
  styleUrl: './tabla-repartos-encontrados.component.scss',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MostrarActivoPipe, MostrarIDPipe, MostrarContenidoPipe]
})
export class TablaRepartosEncontradosComponent {

  pagosService = inject(PagosService);

  verificarSiEstadoSeleccionado(item: Reparto) {
    return this.pagosService.listRepartosSeleccionados().some(r => r.id === item.id);
  }

  quitarItem(item: Reparto) {
    this.pagosService.quitarItem(item);
  }

  agregar(item: Reparto) {
    this.pagosService.agregarItem(item);
  }

  getTotal(): number {
    let total = 0;
    this.pagosService.listRepartosEncontrados().forEach((item: Reparto) => {
      if (item.total) {
        total += item.total;
      }
    })
    return total;
  }

}
