import { Injectable, inject, signal } from '@angular/core';
import { Reparto } from '../../interfaces/reparto';
import { RepartoService } from '../../services/reparto.service';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { fechaActual } from '../../util/funciones';

@Injectable({
  providedIn: 'root'
})
export class RepartosService {

  repartoService = inject(RepartoService)
  public listRepartos = signal<Reparto[]>([]);
  public isLoading = signal<boolean>(false);


  formulario = new FormGroup({
    estado: new FormControl<string>('S'),
    estado_envio: new FormControl<string>('T'),
    num_reparto: new FormControl<string>(''),
    cliente: new FormControl<string>(''),
    desde: new FormControl<string>(fechaActual()),
    hasta: new FormControl<string>(fechaActual()),
    usuario: new FormControl<string>('T'),
  })

  reset() {
    this.listRepartos.set([]);
    this.isLoading.set(false);
  }

  listarRepartos(
    params: any = {
      estado: this.formulario.controls.estado.value,
      estado_envio: this.formulario.controls.estado_envio.value,
      num_reparto: this.formulario.controls.num_reparto.value,
      cliente: this.formulario.controls.cliente.value,
      desde: this.formulario.controls.desde.value,
      hasta: this.formulario.controls.hasta.value,
    }
  ) {
    this.isLoading.set(true);
    this.repartoService.getAll(params)
      .pipe(delay(500))
      .subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            this.listRepartos.set(res.data);
          } else {
            alert(res?.mensaje || 'Error al obtener los repartos');
          }
          this.isLoading.set(false);
        },
        error: (err: any) => {
          this.isLoading.set(false);
          alert(err.message);
        }
      })
  }

  retaurarReparto(id_reparto: number) {
    this.repartoService.setActivo(id_reparto, 'S')
      .subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            Swal.fire({
              title: "Recuperado",
              text: "Se recupero el reparto correctamente",
              icon: "success"
            });
            const params = {
              estado: 'S'
            }
            this.listarRepartos(params);
          } else {
            alert(res?.mensaje || 'Error al recuperar el reparto');
          }
        },
        error: (err: any) => {
          alert(err.message);
        }
      })
  }

  eliminarReparto(id_reparto: number) {
    this.repartoService.setActivo(id_reparto, 'N')
      .subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            Swal.fire({
              title: "Eliminado",
              text: "Se elimino el reparto correctamente",
              icon: "success"
            });
            const params = {
              estado: 'S'
            }
            this.listarRepartos(params);
          } else {
            alert(res?.mensaje || 'Error al eliminar el reparto');
          }
        },
        error: (err: any) => {
          alert(err.message);
        }
      })

  }
}
