import { Injectable, inject, signal } from '@angular/core';
import { Reparto } from '../../interfaces/reparto';
import { RepartoService } from '../../services/reparto.service';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RepartosService {

  repartoService = inject(RepartoService)
  public listRepartos = signal<Reparto[]>([]);
  public isLoading = signal<boolean>(false);

  listarRepartos(
    params: any
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
    this.repartoService.delete(id_reparto, 'S')
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
    this.repartoService.delete(id_reparto, 'N')
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
