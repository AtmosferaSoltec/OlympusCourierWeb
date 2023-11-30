import { Injectable, inject } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Distrito } from '../../models/distrito';
import { TipoPaquete } from '../../models/tipo-paquete';
import { PaqueteService } from '../../services/paquete.service';
import { DistritoService } from '../../services/distrito.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PanelAdminService {

  listUsuarios: Usuario[] = [];
  listUsuariosTotal: Usuario[] = [];
  listDistritos: Distrito[] = [];
  listDistritosTotal: Distrito[] = [];
  listPaquetes: TipoPaquete[] = [];
  listPaquetesTotal: TipoPaquete[] = [];

  router = inject(Router)

  usuarioService = inject(UsuarioService)
  distritoService = inject(DistritoService)
  paqueteService = inject(PaqueteService)

  constructor() {
    this.obtenerUsuarios()
    this.obtenerDistritos()
    this.obtenerTipoPaquetes()
  }



  /** Usuarios **/

  obtenerUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listUsuarios = data.data
          const listMap = this.listUsuarios.map((usuario: Usuario) => {
            if (usuario.cod_rol == "A") {
              usuario.rol = "Admin"
            } else if (usuario.cod_rol == "S") {
              usuario.rol = "Super Usuario"
            } else if (usuario.cod_rol == "U") {
              usuario.rol = "Usuario"
            }
            return usuario;
          })
          this.listUsuarios = listMap;
          this.listUsuariosTotal = listMap;

        } else {
          console.log(data?.mensaje || 'Error al obtener Usuarios');

        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  eliminarUsuario(item: Usuario) {
    this.usuarioService.eliminar(item).subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado.",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#047CC4",
          })
          this.obtenerUsuarios();
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



  /** Tipo Paquetes **/

  obtenerTipoPaquetes() {
    this.paqueteService.getAll().subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          this.listPaquetes = data.data
          this.listPaquetesTotal = this.listPaquetes
        } else {
          console.log(data?.mensaje || 'Error al obtener Tipo de Paquetes');
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  eliminarTipoPaquete(item: TipoPaquete) {
    this.paqueteService.eliminar(item).subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          Swal.fire({
            title: "Eliminado!",
            text: "Tipo de paquete eliminado.",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#047CC4",
          })
          this.obtenerTipoPaquetes();
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



  /** Distritos **/

  obtenerDistritos() {
    this.distritoService.listarDistritos().subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          this.listDistritos = data.data
          this.listDistritosTotal = this.listDistritos
        } else {
          console.log(data?.mensaje || 'Error al obtener Distritos');
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  eliminarDistrito(item: Distrito) {
    this.distritoService.eliminar(item).subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          Swal.fire({
            title: "Eliminado!",
            text: "Distrito eliminado.",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#047CC4",
          })
          this.obtenerDistritos();
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
