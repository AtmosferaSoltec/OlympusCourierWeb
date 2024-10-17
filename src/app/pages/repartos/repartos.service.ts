import { Injectable, inject, signal } from '@angular/core';
import { RepartoNew } from '../../interfaces/reparto';
import { RepartoService } from '../../services/reparto.service';
import Swal from 'sweetalert2';
import { fechaActual } from '../../util/funciones';

@Injectable({
  providedIn: 'root',
})
export class RepartosService {
  repartoService = inject(RepartoService);
  //public listRepartos = signal<Reparto[]>([]);
  public isLoading = signal<boolean>(false);

  listRepartosNew = signal<RepartoNew[]>([]);

  activo = signal<string>('T');
  estadoEnvio = signal<string>('T');
  numReparto = signal<string>('');
  nomCliente = signal<string>('');
  idUsuario = signal<number>(0);
  idVehiculo = signal<number>(0);

  desde = signal<string>(fechaActual());
  hasta = signal<string>(fechaActual());

  reset() {
    this.listRepartosNew.set([]);
    this.isLoading.set(false);
  }

  limit = signal<number>(100);
  page = signal<number>(1);

  totalPage = signal<number>(0);

  getAll() {
    this.isLoading.set(true);
    const params: any = {
      limit: this.limit(),
      page: this.page(),
    };

    if (this.activo() !== 'T') {
      params.activo = this.activo();
    }

    if (this.estadoEnvio() !== 'T') {
      params.estado = this.estadoEnvio();
    }

    if (this.numReparto()) {
      params.num_reparto = this.numReparto();
    }

    if (this.nomCliente()) {
      params.nom_cliente = this.nomCliente();
    }

    if (this.idUsuario() != 0) {
      params.id_usuario = this.idUsuario();
    }

    if (this.idVehiculo() != 0) {
      params.id_vehiculo = this.idVehiculo();
    }

    if (this.desde()) {
      params.desde = this.desde();
    }

    if (this.hasta()) {
      params.hasta = this.hasta();
    }

    console.log(params);

    this.repartoService.getAllNew(params).subscribe({
      next: (res: any) => {
        this.listRepartosNew.set(res.data);
        this.totalPage.set(res.totalPages);
        this.page.set(res.page);
      },
      error: (err: any) => {
        console.log(err);
        
        alert(err.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }


  retaurarReparto(id_reparto: number) {
    this.repartoService.setActivo(id_reparto, 'S').subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          Swal.fire({
            title: 'Recuperado',
            text: 'Se recupero el reparto correctamente',
            icon: 'success',
          });
          
          this.getAll();
        } else {
          alert(res?.mensaje || 'Error al recuperar el reparto');
        }
      },
      error: (err: any) => {
        alert(err.message);
      },
    });
  }

  eliminarReparto(id_reparto: number) {
    this.repartoService.setActivo(id_reparto, 'N').subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          Swal.fire({
            title: 'Eliminado',
            text: 'Se elimino el reparto correctamente',
            icon: 'success',
          });

          this.getAll();
        } else {
          alert(res?.mensaje || 'Error al eliminar el reparto');
        }
      },
      error: (err: any) => {
        alert(err.message);
      },
    });
  }
}
