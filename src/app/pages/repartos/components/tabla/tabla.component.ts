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

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule,
    MatButtonModule, MatTooltipModule, MatMenuModule, MatPaginatorModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
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
    this.repartoService.listarRepartos().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listRepartos = data.data;
        }
      },
      error: error => console.log(error)
    });

  }


  formatoId(id: number): string {
    const idStr = id.toString().slice(0, 6).padStart(6, '0');
    return `#${idStr}`;
  }
  formatDate(fecha: string): string {
    const date = moment(fecha);
    return date.format('DD/MM/YYYY HH:mm');
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
      return rep.items?.reduce((acumulador, objeto) => acumulador + (objeto.cant * objeto.precio), 0);
    } else {
      return 0
    }
  }

  toDetalle(id:number) {
    this.router.navigate(['/menu/detalle-reparto', id]);
  }

  generarComprobante() {

  }
}
