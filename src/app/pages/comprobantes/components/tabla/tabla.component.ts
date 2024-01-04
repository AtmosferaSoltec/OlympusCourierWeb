import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MostrarEstadoNubefactPipe } from "../../../../pipes/mostrar-estado-nubefact.pipe";
import { MostrarTipoDocumentoPipe } from "../../../../pipes/mostrar-tipo-documento.pipe";
import { ComprobantesService } from '../../comprobantes.service';
import { Router } from '@angular/router';
import { Reparto } from '../../../../interfaces/reparto';
import { FormatNumPipe } from "../../../../pipes/format-num.pipe";
import { Comprobante } from '../../../../interfaces/comprobante';

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

  comprobantesService = inject(ComprobantesService)
  router = inject(Router)

  openPdf(url?: string) {
    if (!url) {
      alert('No se encontró el comprobante');
      return;
    }
    window.open(url, '_blank');
  }

  verReparto(id?: number) {
    if (!id) {
      alert('No se encontró el comprobante');
      return;
    }
    this.router.navigate(['menu', 'detalle-reparto', id]);
  }

  anular(reparto: Reparto) {

  }

  getTotal(listComprobante?: Comprobante[]): number {
    if (!listComprobante) {
      return 0;
    }
    return listComprobante.map(r => r.importe_total ?? 0).reduce((acc, value) => acc + value, 0);
  }

}
