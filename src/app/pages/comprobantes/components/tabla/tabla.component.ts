import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MostrarEstadoNubefactPipe } from "../../../../pipes/mostrar-estado-nubefact.pipe";
import { MostrarTipoDocumentoPipe } from "../../../../pipes/mostrar-tipo-documento.pipe";
import { ComprobantesService } from '../../comprobantes.service';
import { Router } from '@angular/router';
import { Reparto } from '../../../../interfaces/reparto';
import { FormatNumPipe } from "../../../../pipes/format-num.pipe";
import { Comprobante } from '../../../../interfaces/comprobante';
import { ComprobanteService } from '../../../../services/comprobante.service';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss',
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    MatTooltipModule, MatMenuModule,
    MostrarEstadoNubefactPipe,
    MostrarTipoDocumentoPipe,
    FormatNumPipe
  ]
})
export class TablaComponent {

  usuarioService = inject(UsuarioService)
  comprobanteService = inject(ComprobanteService)
  comprobantesService = inject(ComprobantesService)
  router = inject(Router)

  openPdf(url?: string) {
    if (!url) {
      alert('No se encontró el comprobante');
      return;
    }
    window.open(url, '_blank');
  }

  verificarTiempo(fecha_creacion?: string): boolean {
    //Verificar que la fecha de creacion sea menor a 7 dias
    if (!fecha_creacion) {
      return false;
    }
    const fecha = new Date(fecha_creacion);
    const fechaActual = new Date();
    const diferencia = fechaActual.getTime() - fecha.getTime();
    const dias = Math.round(diferencia / (1000 * 60 * 60 * 24));
    return dias <= 7;
  }

  anular(comprobante: Comprobante) {
    const body = {
      id_comprobante: comprobante.id,
      motivo: 'Se elimino, por error de carga'
    }
    this.comprobanteService.anular(body).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          alert('Se anuló el comprobante correctamente');
          this.comprobantesService.listarComprobantes();
        } else {
          alert(res?.mensaje);
        }
      },
      error: err => {
        console.log(err);
        alert('Ocurrió un error al anular el comprobante');
      }
    })
  }

  getTotal(listComprobante?: Comprobante[]): number {
    if (!listComprobante) {
      return 50;
    }
    return listComprobante.map(r => Number(r.importe_total) ?? 0).reduce((acc, value) => acc + value, 0);
  }

}
