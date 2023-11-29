import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-repartos',
  standalone: true,
  imports: [
    CommonModule,
    FiltrosComponent,
    TablaComponent,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterOutlet
  ],
  templateUrl: './repartos.component.html',
  styleUrl: './repartos.component.css'
})
export class RepartosComponent {


  router = inject(Router);

  toAgregar() {
    this.router.navigateByUrl('/menu/agregar-reparto')
  }

}
