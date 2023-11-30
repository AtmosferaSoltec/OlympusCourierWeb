import { Injectable, inject } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Distrito } from '../../models/distrito';
import { TipoPaquete } from '../../models/tipo-paquete';
import { PaqueteService } from '../../services/paquete.service';
import { DistritoService } from '../../services/distrito.service';

@Injectable({
  providedIn: 'root'
})
export class PanelAdminService {

  listUsuarios: Usuario[] = [];
  listDistritos: Distrito[] = [];
  listPaquetes: TipoPaquete[] = [];

  usuarioService = inject(UsuarioService)
  distritoService = inject(DistritoService)
  paqueteService = inject(PaqueteService)

  constructor() {
    this.listarUsuarios()
    this.obtenerDistritos()
    this.obtenerTipoPaquetes()
  }

  listarUsuarios() {
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

        } else {
          console.log(data?.mensaje || 'Error al obtener Usuarios');

        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  obtenerDistritos() {
    this.distritoService.listarDestinos().subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          this.listDistritos = data.data
        } else {
          console.log(data?.mensaje || 'Error al obtener Distritos');
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  obtenerTipoPaquetes() {
    this.paqueteService.getAll().subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          this.listPaquetes = data.data
        } else {
          console.log(data?.mensaje || 'Error al obtener Tipo de Paquetes');
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
