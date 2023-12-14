import { Injectable, inject, signal } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Distrito } from '../../interfaces/distrito';
import { TipoPaquete } from '../../interfaces/tipo-paquete';
import { PaqueteService } from '../../services/paquete.service';
import { DistritoService } from '../../services/distrito.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PanelAdminService {

  listPaquetes: TipoPaquete[] = [];
  listPaquetesTotal: TipoPaquete[] = [];

  router = inject(Router)

  usuarioService = inject(UsuarioService)
  distritoService = inject(DistritoService)
  paqueteService = inject(PaqueteService)


  listDistritosTotal = this.distritoService.listDistritos();


  eliminarTipoPaquete(item: TipoPaquete, estado: string) {
    this.paqueteService.eliminar(item.id, estado).subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          Swal.fire({
            title: "Eliminado!",
            text: "Tipo de paquete eliminado.",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#047CC4",
          })

        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data?.mensaje || 'Error al eliminar',
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#047CC4",
          });
        }
      },
      error: (err) => console.log(err)
    });
  }

  eliminarDistrito(item: Distrito, estado: string) {
    this.distritoService.eliminar(item.id, estado).subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          Swal.fire({
            title: "Eliminado!",
            text: "Distrito eliminado.",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#047CC4",
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data?.mensaje || 'Error al eliminar',
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#047CC4",
          });
        }
      },
      error: (err) => console.log(err)
    });
  }


}
