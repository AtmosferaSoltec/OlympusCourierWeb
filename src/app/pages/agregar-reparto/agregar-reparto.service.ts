import { Injectable, inject, signal } from '@angular/core';
import { ItemReparto } from '../../interfaces/item-reparto';
import { Cliente } from '../../interfaces/cliente';
import { RepartoService } from '../../services/reparto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../interfaces/vehiculo';

@Injectable({
  providedIn: 'root',
})
export class AgregarRepartoService {
  listItemRepartos = signal<ItemReparto[]>([]);
  cliente = signal<Cliente | null>(null);
  isLoadingAgregarReparto = signal<boolean>(false);

  repartoService = inject(RepartoService);

  vehiculoService = inject(VehiculoService);

  router = inject(Router);

  constructor() {
    this.listarVehiculos();
  }

  reset() {
    this.listItemRepartos.set([]);
    this.cliente.set(null);
  }

  agregarReparto(body: any) {
    if (body.id) {
      this.isLoadingAgregarReparto.set(true);
      this.repartoService.update(body.id, body).subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            this.reset();
            Swal.fire({
              icon: 'success',
              title: '¡Bien hecho!',
              text: 'Reparto actualizado correctamente',
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#047CC4',
            });
            this.router.navigate(['../']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Opss...',
              text: res?.mensaje || 'Error al actualizar',
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#047CC4',
            });
          }
        },
        complete: () => {
          this.isLoadingAgregarReparto.set(false);
        }
      });
    } else {
      this.isLoadingAgregarReparto.set(true);
      this.repartoService.insert(body).subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            this.reset();
            Swal.fire({
              icon: 'success',
              title: '¡Bien hecho!',
              text: 'Reparto agregado correctamente',
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#047CC4',
            });
            this.router.navigate(['../']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Opss...',
              text: res?.mensaje || 'Error al insertar',
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#047CC4',
            });
          }
        },
        error: (err: any) => {
          alert(err.message);
          console.log(err);
        },
        complete: () => {
          this.isLoadingAgregarReparto.set(false);
        },
      });
    }
  }

  listVehiculos = signal<Vehiculo[]>([]);

  listarVehiculos() {
    this.vehiculoService.getAll().subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          this.listVehiculos.set(res.data);
        } else {
          alert(res?.mensaje);
        }
      },
      error: (err) => console.log(err),
    });
  }
}
