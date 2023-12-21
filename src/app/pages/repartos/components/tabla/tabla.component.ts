import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { Reparto } from '../../../../interfaces/reparto';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import Swal from 'sweetalert2';
import { MostrarIDPipe } from "../../../../pipes/mostrar-id.pipe";
import { MostrarEstadoPipe } from "../../../../pipes/mostrar-estado.pipe";
import { RepartosService } from '../../repartos.service';
import { FormatNumPipe } from "../../../../pipes/format-num.pipe";

@Component({
    selector: 'app-tabla',
    standalone: true,
    templateUrl: './tabla.component.html',
    styleUrl: './tabla.component.scss',
    imports: [CommonModule, MatIconModule,
        MatButtonModule, MatTooltipModule, MatMenuModule, MostrarIDPipe, MostrarEstadoPipe, FormatNumPipe]
})
export class TablaComponent {

  repartosService = inject(RepartosService)
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  getTotal(listRepartos?: Reparto[]): number {
    if (!listRepartos) {
      return 0;
    }
    return listRepartos.map(r => r.total ?? 0).reduce((acc, value) => acc + value, 0);
  }

  toDetalle(id: number | undefined) {
    this.router.navigate(['/menu/detalle-reparto', id]);
  }

  // Alerta para eliminar un reparto
  deleteReparto(reparto: Reparto) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se eliminara el reparto seleccionado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!reparto.id) {
          return alert('No se pudo eliminar el reparto')
        }
        this.repartosService.eliminarReparto(reparto.id)
      }
    });
  }

  // Alerta para recuperar un reparto
  recuperarReparto(reparto: Reparto) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se recuperara el reparto seleccionado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result?.isConfirmed) {
        if (!reparto.id) {
          return alert('No se pudo recuperar el reparto')
        }
        this.repartosService.retaurarReparto(reparto.id)
      }
    })
  }

}
