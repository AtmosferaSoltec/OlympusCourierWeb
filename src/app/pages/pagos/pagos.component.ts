import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarRepartoComponent } from './components/buscar-reparto/buscar-reparto.component';
import { TablaRepartosEncontradosComponent } from './components/tabla-repartos-encontrados/tabla-repartos-encontrados.component';
import { TablaRepartosSeleccionadosComponent } from './components/tabla-repartos-seleccionados/tabla-repartos-seleccionados.component';
import { BotonComponent } from '../../components/boton/boton.component';
import { TituloComponent } from '../../components/titulo/titulo.component';
import { PagosService } from './pagos.service';
import { Router } from '@angular/router';
import { GenerarComprobanteService } from '../generar-comprobante/generar-comprobante.service';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    CommonModule, BuscarRepartoComponent, TablaRepartosEncontradosComponent,
    TablaRepartosSeleccionadosComponent, BotonComponent, TituloComponent
  ],
  templateUrl: './pagos.component.html'
})
export class PagosComponent implements OnDestroy {

  generarComprobanteService = inject(GenerarComprobanteService)
  pagosService = inject(PagosService);
  router = inject(Router);

  ngOnDestroy(): void {
    this.pagosService.reset();
  }


  toGenerarComprobante() {
    this.generarComprobanteService.listRepartos.set(this.pagosService.listRepartosSeleccionados())
    this.router.navigate(['menu', 'generar-comprobante']);
  }

}
