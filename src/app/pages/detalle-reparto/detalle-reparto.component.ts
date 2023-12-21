import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DetalleRepartoService } from './detalle-reparto.service';
import { CardItemComponent } from './components/card-item/card-item.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetalleItemComponent } from '../../components/detalle-item/detalle-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { Comprobante } from '../../interfaces/comprobante';
import { MostrarEstadoPipe } from "../../pipes/mostrar-estado.pipe";
import { FormatTelfPipe } from "../../pipes/format-telf.pipe";
import { FormatNumPipe } from "../../pipes/format-num.pipe";

@Component({
  selector: 'app-detalle-reparto',
  standalone: true,
  templateUrl: './detalle-reparto.component.html',
  styleUrl: './detalle-reparto.component.scss',
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    RouterOutlet, CardItemComponent,
    MatTooltipModule, DetalleItemComponent, MatMenuModule,
    MostrarEstadoPipe, FormatTelfPipe,
    FormatNumPipe
  ]
})
export class DetalleRepartoComponent implements OnInit {

  comprobante = signal<Comprobante | null>(null);
  router = inject(Router)

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
  }


}
