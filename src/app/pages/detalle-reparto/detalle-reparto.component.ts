import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Reparto } from '../../models/reparto';
import { RepartoService } from '../../services/reparto.service';

@Component({
  selector: 'app-detalle-reparto',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './detalle-reparto.component.html',
  styleUrl: './detalle-reparto.component.css'
})
export class DetalleRepartoComponent {

  reparto: Reparto | null = null;

  repartoService = inject(RepartoService)

  list = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]


  constructor() {
    this.repartoService.get(1).subscribe({
      next: (data: any) => {
        if (data) {
          if (data.isSuccess) {
            this.reparto = data.data
          } else {
            console.log(data.mensaje);

          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
