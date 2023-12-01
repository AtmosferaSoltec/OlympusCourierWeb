import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Reparto } from '../../models/reparto';
import { RepartoService } from '../../services/reparto.service';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DetalleRepartoService } from './detalle-reparto.service';
import { CardItemComponent } from './components/card-item/card-item.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenerarComprobanteComponent } from './components/dialog-generar-comprobante/dialog-generar-comprobante.component';

@Component({
  selector: 'app-detalle-reparto',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    RouterOutlet, CardItemComponent, DetalleClienteComponent
  ],
  templateUrl: './detalle-reparto.component.html',
  styleUrl: './detalle-reparto.component.scss'
})
export class DetalleRepartoComponent implements OnInit {

  reparto: Reparto | null = null;
  router = inject(Router)

  repartoService = inject(RepartoService)

  list = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]

  back() {
    this.router.navigate(['/menu', '/repartos'])
  }

  service = inject(DetalleRepartoService)
  private actRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      const id = params['id'];
      this.service.getReparto(id)
    });

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

  dialog = inject(MatDialog)

  toGenerarComprobante(){
    this.dialog.open(DialogGenerarComprobanteComponent)
  }

}
