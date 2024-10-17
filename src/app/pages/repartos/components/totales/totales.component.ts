import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepartosService } from '../../repartos.service';

@Component({
  selector: 'app-totales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './totales.component.html',
})
export class TotalesComponent {
  service = inject(RepartosService);

  getTotalAdicional() {
    return this.service
      .listRepartosNew()
      .reduce((acc, reparto) => acc + (reparto.costo_adicional ?? 0), 0);
  }

  getTotalRepartos() {
    return this.service
      .listRepartosNew()
      .reduce((acc, reparto) => acc + (reparto.costo_reparto ?? 0), 0);
  }

  getTotal() {
    return this.getTotalAdicional() + this.getTotalRepartos();
  }
}
