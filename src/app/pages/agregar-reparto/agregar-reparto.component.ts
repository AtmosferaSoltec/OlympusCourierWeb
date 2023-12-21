import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepartoService } from '../../services/reparto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { TablaItemsComponent } from './components/tabla-items/tabla-items.component';
import { AgregarRepartoService } from './agregar-reparto.service';
import { BotonComponent } from '../../components/boton/boton.component';
import { TituloComponent } from '../../components/titulo/titulo.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-agregar-reparto',
  standalone: true,
  imports: [
    CommonModule, TablaItemsComponent, MatIconModule,
    MatButtonModule, ReactiveFormsModule, BuscarClienteComponent,
    BotonComponent, TituloComponent, MatTooltipModule
  ],
  templateUrl: './agregar-reparto.component.html',
  styleUrl: './agregar-reparto.component.scss'
})
export class AgregarRepartoComponent implements OnDestroy {

  formulario = new FormGroup({
    clave: new FormControl('', [Validators.required, Validators.minLength(4)]),
    anotacion: new FormControl('')
  })

  private repartoService = inject(RepartoService);
  private service = inject(AgregarRepartoService);
  private router = inject(Router);

  ngOnDestroy(): void {
    this.service.reset();
  }


  displayFn(option: any): string {
    return option && option.doc ? option.doc : '';
  }


  back() {
    this.router.navigate(['menu', 'repartos'])
  }

  cancel() {
    if (this.service.cliente() && this.service.listItemRepartos()) {
      Swal.fire({
        title: '¡Alerta de Seguridad!',
        text: '¿Estás seguro de que deseas regresar a la pantalla anterior? Todos los datos ingresados se perderán.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#047CC4',
        cancelButtonColor: '#CF475B',
        confirmButtonText: 'Sí, regresar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['../']);
        }
      });
    } else {
      this.router.navigate(['../']);
    }
  }


  getTotal() {
    return this.service.listItemRepartos().reduce((total, item) => total + (item?.precio || 0), 0);
  }

  guardarReparto() {
    const controls = this.formulario.controls;

    if (!this.service.cliente()?.id) {
      Swal.fire({
        icon: 'question',
        title: 'Sin Cliente',
        text: 'Debes ingresar un cliente',
        confirmButtonText: "Continuar",
        confirmButtonColor: "#047CC4",
      });
      return;
    }

    if (this.service.listItemRepartos.length === 0) {
      Swal.fire({
        icon: 'question',
        title: 'Sin Items',
        text: 'Ingresa minimo un item',
        confirmButtonText: "Continuar",
        confirmButtonColor: "#047CC4",
      });
      return;
    }

    const body = {
      anotacion: controls.anotacion?.value,
      clave: controls.clave?.value,
      id_cliente: this.service.cliente()?.id,
      items: this.service.listItemRepartos
    }

    this.service.agregarReparto(body);

  }

}
