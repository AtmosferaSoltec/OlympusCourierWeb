import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DetalleRepartoService } from './detalle-reparto.service';
import { CardItemComponent } from './components/card-item/card-item.component';
import { MatDialog } from '@angular/material/dialog';
import { MostrarIDPipe } from "../../pipes/mostrar-id.pipe";
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetalleItemComponent } from '../../components/detalle-item/detalle-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { Comprobante } from '../../interfaces/comprobante';
import { ComprobanteService } from '../../services/comprobante.service';
import { MostrarEstadoPipe } from "../../pipes/mostrar-estado.pipe";
import { FormatTelfPipe } from "../../pipes/format-telf.pipe";
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-detalle-reparto',
  standalone: true,
  templateUrl: './detalle-reparto.component.html',
  styleUrl: './detalle-reparto.component.scss',
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    RouterOutlet, CardItemComponent, MostrarIDPipe,
    MatTooltipModule, DetalleItemComponent, MatMenuModule,
    MostrarEstadoPipe, FormatTelfPipe
  ]
})
export class DetalleRepartoComponent implements OnInit {

  comprobante = signal<Comprobante | null>(null);
  router = inject(Router)
  comprobanteService = inject(ComprobanteService)
  usuarioService = inject(UsuarioService)

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

  open(url?: string) {
    if (url) {
      console.log(url);
      window.open(url, '_blank');
    }
  }
}
