import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { Reparto } from '../../../../models/reparto';
import { Router } from '@angular/router';
import moment from 'moment';
import { RepartoService } from '../../../../services/reparto.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule,
    MatButtonModule, MatTooltipModule, MatMenuModule, MatPaginatorModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent {

  listRepartos: Reparto[] = [];
  columnas: string[] = [
    'id',
    'cliente',
    'fecha',
    'estado',
    'flete',
    'act',
  ];



  repartoService = inject(RepartoService);
  usuarioService = inject(UsuarioService);

  constructor() {
    this.listarRepartos();
  }

  listarRepartos() {
    this.repartoService.listarRepartos().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listRepartos = data.data;
        }
      },
      error: error => console.log(error)
    });
  }


  formatoId(id: number | undefined): string {
    const idStr = id?.toString().slice(0, 6).padStart(6, '0');
    return `#${idStr}`;
  }
  formatDate(fecha: string | undefined): string {
    if (fecha == undefined) {
      return 'Sin Fecha';
    } else {
      const date = moment(fecha);
      return date.format('DD/MM/YYYY HH:mm');
    }
  }
  getEstado(estado: string): string {
    switch (estado) {
      case 'P':
        return 'Pendiente';
      case 'E':
        return 'Entregado';
      case 'A':
        return 'Anulado';
      default:
        return 'Sin Valor';
    }
  }

  router = inject(Router);



  getTotal(rep: Reparto): number {
    if (rep.items != undefined) {
      return rep.items?.reduce((acumulador, objeto) => acumulador + ((objeto?.cant || 1) * (objeto?.precio || 1)), 0);
    } else {
      return 0
    }
  }

  toDetalle(id: number | undefined) {
    this.router.navigate(['/menu/detalle-reparto', id]);
  }

  generarComprobante() {

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
              this.listarRepartos();
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
              this.listarRepartos();
            } else {
              Swal.fire({
                title: "Error",
                text: data?.mensaje || "Ocurrio un error al recuperar el reparto",
                icon: "error"
              });
            }
          },
          error : (err)=>{
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

}
