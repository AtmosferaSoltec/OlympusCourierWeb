import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  templateUrl: './buscar-reparto.component.html'
})
export class BuscarRepartoComponent {

  pagosService = inject(PagosService);

  formulario: FormGroup;

  constructor(
    fb: FormBuilder
  ) {

    this.formulario = fb.group({
      desde: [fechaActual()],
      hasta: [fechaActual()],
      buscar: ['']
    })

  }

  buscar() {
    const controls = this.formulario.value;
    const params = {
      estado: 'S',
      desde: controls.desde,
      hasta: controls.hasta,
      num_reparto: controls.buscar
    }
    this.pagosService.buscarRepartos(params);
  }
}
