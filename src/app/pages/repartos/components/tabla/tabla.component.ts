import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { Reparto } from '../../../../interfaces/reparto';
import { Router } from '@angular/router';
import { RepartoService } from '../../../../services/reparto.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MostrarIDPipe } from "../../../../pipes/mostrar-id.pipe";
import { MostrarEstadoPipe } from "../../../../pipes/mostrar-estado.pipe";
import { MostrarComprobantePipe } from "../../../../pipes/mostrar-comprobante.pipe";
import { ComprobanteService } from '../../../../services/comprobante.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss',
  imports: [CommonModule, MatIconModule,
    MatButtonModule, MatTooltipModule, MatMenuModule, MostrarIDPipe, MostrarEstadoPipe, MostrarComprobantePipe]
})
export class TablaComponent {

  comprobanteService = inject(ComprobanteService);
  repartoService = inject(RepartoService);
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  constructor() {
    const params = {
      estado: 'S'
    }
    this.repartoService.getAll(params);
  }

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
        this.repartoService.delete(reparto.id, 'N').subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              Swal.fire({
                title: "Eliminado",
                text: "Se elimino el reparto correctamente",
                icon: "success"
              });
              // Actualizar la lista de repartos
              const params = {
                estado: 'S'
              }
              this.repartoService.getAll(params);
            } else {
              Swal.fire({
                title: "Error",
                text: data?.mensaje || "Ocurrio un error al eliminar el reparto",
                icon: "error"
              });
            }
          }
        })
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
        this.repartoService.delete(reparto.id, 'S').subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              Swal.fire({
                title: "Recuperado",
                text: "Se recupero el reparto correctamente",
                icon: "success"
              });
              // Actualizar la lista de repartos
              const params = {
                estado: 'S'
              }
              this.repartoService.getAll(params);
            } else {
              Swal.fire({
                title: "Error",
                text: data?.mensaje || "Ocurrio un error al recuperar el reparto",
                icon: "error"
              });
            }
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              title: "Error",
              text: err || "Ocurrio un error al recuperar el reparto",
              icon: "error"
            })
          }
        })
      }
    })
  }

  buscarUsuario(id?: number): string {
    if (!id) {
      return 'Desconocido';
    }

    const usuario = this.usuarioService.listUsuarios()?.find(u => u.id === id);

    if (!usuario) {
      return 'Desconocido';
    } else {
      return `${usuario.nombres}`
    }

  }

}
