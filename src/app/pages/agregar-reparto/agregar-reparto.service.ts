import { Injectable, inject, signal } from '@angular/core';
import { ItemReparto } from '../../interfaces/item-reparto';
import { Cliente } from '../../interfaces/cliente';
import { RepartoService } from '../../services/reparto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../interfaces/vehiculo';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../../components/dialog-add-cliente/dialog-add-cliente.component';
import { ClienteService } from '../../services/cliente.service';

@Injectable({
  providedIn: 'root',
})
export class AgregarRepartoService {
  listItemRepartos = signal<ItemReparto[]>([]);
  isLoadingAgregarReparto = signal<boolean>(false);

  client = signal<Cliente | null>(null);

  repartoService = inject(RepartoService);

  vehiculoService = inject(VehiculoService);

  router = inject(Router);

  constructor() {
    this.listarVehiculos();
  }

  reset() {
    this.listItemRepartos.set([]);
    this.client.set(null);
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
        },
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

  clienteService = inject(ClienteService);
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog
      .open(DialogAddClienteComponent, {
        width: '950px',
        data: this.client(),
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.clienteService.get(data).subscribe({
            next: (res) => {
              this.client.set(res);
            },
            error: (err: any) => console.log(err),
          });
        }
      });
  }
}
