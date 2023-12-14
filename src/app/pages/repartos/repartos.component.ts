import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { RepartoService } from '../../services/reparto.service';

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
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './repartos.component.html',
  styleUrl: './repartos.component.scss'
})
export class RepartosComponent {


  router = inject(Router);

  toAgregar() {
    this.router.navigateByUrl('/menu/agregar-reparto')
  }

  estado = new FormControl('T');
  repartoService = inject(RepartoService)

  ngOnInit(): void {
    this.estado.valueChanges
      .subscribe({
        next: (valor: any) => {
          if (!valor) {
            return;
          }
          this.repartoService.getAll(valor);
        }
      })
  }


}
