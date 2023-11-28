import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ItemReparto } from '../../models/item-reparto';
import { RepartoService } from '../../services/reparto.service';
import { Router } from '@angular/router';
import { Reparto } from '../../models/reparto';
import Swal from 'sweetalert2';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { TablaItemsComponent } from './components/tabla-items/tabla-items.component';
import { AgregarRepartoService } from './agregar-reparto.service';
@Component({
  selector: 'app-agregar-reparto',
  standalone: true,
  imports: [
    CommonModule, TablaItemsComponent, MatIconModule,
    MatButtonModule, ReactiveFormsModule, BuscarClienteComponent
  ],
  templateUrl: './agregar-reparto.component.html',
  styleUrl: './agregar-reparto.component.css'
})
export class AgregarRepartoComponent {

  formulario: FormGroup;

  private repartoService = inject(RepartoService);
  private service = inject(AgregarRepartoService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.formulario = this.fb.group({
      clave: ['', [Validators.required, Validators.minLength(4)]],
      anotacion: ['']
    })
  }


  displayFn(option: any): string {
    return option && option.doc ? option.doc : '';
  }


  back() {
    this.router.navigateByUrl('/menu/repartos');
  }

  cancel() {
    if (this.service.cliente && this.service.listItemRepartos) {
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
    return this.service.listItemRepartos.reduce((total, item) => total + item.precio, 0);
  }

  async guardarReparto() {
    const toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    if (this.service.cliente?.id != undefined) {
      if (this.service.listItemRepartos.length > 0) {

        const reparto: Reparto = {
          anotacion: this.formulario.get('anotacion')?.value || '',
          clave: this.formulario.get('clave')?.value || '1234',
          estado: 'P',
          id_cliente: this.service.cliente.id,
          items: this.service.listItemRepartos,
        }
        const res = await this.repartoService.insert(reparto)
        if (res) {
          this.router.navigate(['../'])
        }
      } else {
        toast.fire({
          icon: 'question',
          title: 'Ingrese un item'
        })
      }
    } else {

      toast.fire({
        icon: 'question',
        title: 'Ingrese un cliente'
      })
    }
  }
}
