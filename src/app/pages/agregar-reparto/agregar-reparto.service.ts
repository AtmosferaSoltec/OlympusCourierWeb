import { Injectable, inject, signal } from '@angular/core';
import { ItemReparto } from '../../interfaces/item-reparto';
import { Cliente } from '../../interfaces/cliente';
import { RepartoService } from '../../services/reparto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgregarRepartoService {

  listItemRepartos = signal<ItemReparto[]>([]);
  cliente = signal<Cliente | null>(null);
  isLoadingAgregarReparto = signal<boolean>(false);

  repartoService = inject(RepartoService)

  router = inject(Router)

  constructor() { }

  reset() {
    this.listItemRepartos.set([]);
    this.cliente.set(null);
  }

  agregarReparto(body: any) {
    this.isLoadingAgregarReparto.set(true);
    this.repartoService.insert(body)
      .pipe(delay(5000))
      .subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            this.reset()
            Swal.fire({
              icon: 'success',
              title: '¡Bien hecho!',
              text: 'Reparto agregado correctamente',
              confirmButtonText: "Continuar",
              confirmButtonColor: "#047CC4",
            })
            this.router.navigate(['../'])
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Opss...',
              text: res?.mensaje || 'Error al insertar',
              confirmButtonText: "Continuar",
              confirmButtonColor: "#047CC4",
            })
          }
        },
        error: (err: any) => {
          alert(err.message);
          console.log(err);
        },
        complete: () => {
          this.isLoadingAgregarReparto.set(false);
        }
      })
  }
}
