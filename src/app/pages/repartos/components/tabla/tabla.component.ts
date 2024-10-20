import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { HistorialReparto, Reparto, RepartoNew } from '../../../../interfaces/reparto';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import Swal from 'sweetalert2';
import { MostrarEstadoPipe } from "../../../../pipes/mostrar-estado.pipe";
import { RepartosService } from '../../repartos.service';
import { FormatNumPipe } from "../../../../pipes/format-num.pipe";
import { MostrarActivoPipe } from "../../../../pipes/mostrar-activo.pipe";

@Component({
  selector: 'app-tabla',
  standalone: true,
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    MatTooltipModule, MatMenuModule, MostrarEstadoPipe,
    FormatNumPipe,
    MostrarActivoPipe
  ]
})
export class TablaComponent {

  repartosService = inject(RepartosService)
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  toDetalle(id: number | undefined) {
    this.router.navigate(['/menu/detalle-reparto', id]);
  }

  toEditar(id: number | undefined) {
    this.router.navigate(['/menu/editar-reparto', id]);
  }

  // Alerta para eliminar un reparto
  deleteReparto(reparto: RepartoNew) {
    if (reparto.comprobante) {
      //No se puede elimnar porque tiene un comprobante asociado
      Swal.fire({
        title: "No se puede eliminar",
        text: "El reparto seleccionado tiene un comprobante asociado",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#047CC4"
      })
      return;
    }

    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se eliminara el reparto seleccionado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#047CC4"
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
  recuperarReparto(reparto: RepartoNew) {
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
