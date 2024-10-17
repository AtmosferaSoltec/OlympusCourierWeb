import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepartosService } from '../../repartos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pager',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './pager.component.html',
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
