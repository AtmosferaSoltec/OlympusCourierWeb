import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Reparto } from '../../interfaces/reparto';
import { RepartoService } from '../../services/reparto.service';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DetalleRepartoService } from './detalle-reparto.service';
import { CardItemComponent } from './components/card-item/card-item.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenerarComprobanteComponent } from './components/dialog-generar-comprobante/dialog-generar-comprobante.component';
import { MostrarIDPipe } from "../../pipes/mostrar-id.pipe";
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetalleItemComponent } from '../../components/detalle-item/detalle-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { Comprobante } from '../../interfaces/comprobante';
import { ComprobanteService } from '../../services/comprobante.service';
import Swal from 'sweetalert2';
import { MostrarEstadoPipe } from "../../pipes/mostrar-estado.pipe";

@Component({
  selector: 'app-detalle-reparto',
  standalone: true,
  templateUrl: './detalle-reparto.component.html',
  styleUrl: './detalle-reparto.component.scss',
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    RouterOutlet, CardItemComponent, DetalleClienteComponent,
    MostrarIDPipe, MatTooltipModule, DetalleItemComponent, MatMenuModule,
    MostrarEstadoPipe
  ]
})
export class DetalleRepartoComponent implements OnInit {

  reparto: Reparto | null = null;
  comprobante = signal<Comprobante | null>(null);
  router = inject(Router)

  repartoService = inject(RepartoService)
  comprobanteService = inject(ComprobanteService)

  back() {
    this.router.navigate(['/menu', '/repartos'])
  }

  service = inject(DetalleRepartoService)
  private actRoute = inject(ActivatedRoute)
  id: number = 0;

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
      this.service.getReparto(this.id)
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

    this.getComprobante()
  }

  getComprobante() {
    this.comprobanteService.get(this.id).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          this.comprobante.set(res.data);
          console.log(res.data);
          
        } else {
          console.log(res?.mensaje);
        }
      },
      error: (err: any) => {
        console.log(err.message)
      }
    });
  }

  dialog = inject(MatDialog)

  toGenerarComprobante() {
    this.router.navigate(['/menu/generar-comprobante', this.id]);
  }

  open(url?: string) {
    console.log(url);
    
    if (url) {
      console.log(url);
      
      window.open(url, '_blank');
    }
  }
}
