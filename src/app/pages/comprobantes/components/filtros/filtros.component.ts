import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprobantesService } from '../../comprobantes.service';
import { MetodoPagoService } from '../../../../services/metodo-pago.service';
import { BotonComponent } from '../../../../components/boton/boton.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { fechaActual } from '../../../../util/funciones';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, BotonComponent, ReactiveFormsModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent {
  metodoPagoService = inject(MetodoPagoService);
  comprobantesService = inject(ComprobantesService);


  filtrarComprobantes() {
    const controls = this.comprobantesService.formulario.controls;

    const params = {
      serie: controls.serie.value,
      comprobante: controls.comprobante.value,
      cliente: controls.cliente.value,
      desde: controls.desde.value,
      hasta: controls.hasta.value,
      tipo_comprobante: controls.tipo_comprobante.value,
      activo: controls.activo.value,
      id_metodo_pago: controls.id_metodo_pago.value,
    }

    this.comprobantesService.listarComprobantes(params);
  }

}
