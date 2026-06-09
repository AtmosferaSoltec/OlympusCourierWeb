import { Component, inject } from '@angular/core';

import { RepartosService } from '../repartos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pager',
  imports: [MatIconModule, MatButtonModule],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-2">
      <span>Resultados por página</span>
      <select [value]="service.limit()" (change)="setLimit($event)">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
      </select>

      <div class="flex items-center">
        <span> {{ service.page() }} de {{ service.totalPage() }} </span>
        <button
          mat-icon-button
          (click)="prevPage()"
          [disabled]="service.page() === 1"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>
        <button
          mat-icon-button
          (click)="nextPage()"
          [disabled]="service.page() === service.totalPage()"
        >
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
    </div>
  `,
})
export class PagerComponent {
  service = inject(RepartosService);

  setLimit(event: any) {
    this.service.limit.set(event.target.value);
  }

  nextPage() {
    if (this.service.page() < this.service.totalPage()) {
      this.service.page.set(this.service.page() + 1);
      this.service.getAll(); // Llamar a la función para actualizar la lista
    }
  }

  prevPage() {
    if (this.service.page() > 1) {
      this.service.page.set(this.service.page() - 1);
      this.service.getAll(); // Llamar a la función para actualizar la lista
    }
  }
}
