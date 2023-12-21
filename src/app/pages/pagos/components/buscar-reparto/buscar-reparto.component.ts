import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BotonComponent } from '../../../../components/boton/boton.component';
import { PagosService } from '../../pagos.service';
import { fechaActual } from '../../../../util/funciones';

@Component({
  selector: 'app-buscar-reparto',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    BotonComponent
  ],
  templateUrl: './buscar-reparto.component.html',
  styleUrl: './buscar-reparto.component.scss'
})
export class BuscarRepartoComponent {

  pagosService = inject(PagosService);

  formulario = new FormGroup({
    desde: new FormControl<string>(fechaActual()),
    hasta: new FormControl<string>(fechaActual()),
    buscar: new FormControl('')
  })

  buscar() {
    const controls = this.formulario.controls;
    const params = {
      estado: 'S',
      desde: controls.desde.value,
      hasta: controls.hasta.value,
    }
    this.pagosService.buscarRepartos(params);
  }
}
