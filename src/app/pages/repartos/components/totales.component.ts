import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepartosService } from '../repartos.service';

@Component({
  selector: 'app-totales',
  imports: [CommonModule],
  template: `
    <div
      class="flex flex-wrap items-center justify-start gap-x-4 gap-y-1 text-base md:text-lg"
    >
      <span class="whitespace-nowrap">
        <span class="font-bold text-colorP1">Total Repartos</span>
        <span class="ml-1 text-colorGrey">{{
          service.listRepartosNew().length
        }}</span>
      </span>

      <span class="whitespace-nowrap">
        <span class="font-bold text-colorP1">C. Adicional</span>
        <span class="ml-1 text-colorGrey"
          >S/ {{ getTotalAdicional() | number: '1.2-2' }}</span
        >
      </span>

      <span class="whitespace-nowrap">
        <span class="font-bold text-colorP1">C. Reparto</span>
        <span class="ml-1 text-colorGrey"
          >S/ {{ getTotalRepartos() | number: '1.2-2' }}</span
        >
      </span>

      <span class="whitespace-nowrap">
        <span class="font-bold text-colorP1">Total</span>
        <span class="ml-1 text-colorGrey"
          >S/ {{ getTotal() | number: '1.2-2' }}</span
        >
      </span>
    </div>
  `,
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
