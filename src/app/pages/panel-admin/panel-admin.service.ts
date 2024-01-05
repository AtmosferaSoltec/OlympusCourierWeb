import { Injectable, inject, signal } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PanelAdminService {

  usuarioService = inject(UsuarioService);
  listUsuarios = signal<Usuario[]>([]);
  isLoading = signal<boolean>(false);

  constructor() {
    this.listarUsuarios();
  }


  listarUsuarios(estado: 'S' | 'N' = 'S') {
    this.isLoading.set(true);
    const params = {
      estado: estado
    }
    this.usuarioService.getAll(params)
      .pipe(delay(500))
      .subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.listUsuarios.set(res.data);
          } else {
            alert(res?.mensaje || 'Error al obtener usuarios');
            console.log(res?.mensaje);
          }
          this.isLoading.set(false)
        },
        error: (err: any) => {
          console.log(err);
          alert(err.message);
          this.isLoading.set(false);
        }
      })
  }

  setEstadoUsuario(id_usuario: number, estado: 'S' | 'N') {
    this.usuarioService.delete(id_usuario, estado)
      .subscribe({
        next: (data) => {
          if (data?.isSuccess) {
            let title = estado === "N" ? "Eliminado!" : "Restaurado!"
            let text = estado === "N" ? "Usuario eliminado." : "Usuario restaurado."
            Swal.fire({
              title: title,
              text: text,
              icon: "success",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#047CC4",
            })
            this.listarUsuarios()
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
        error: (err: any) => {
          alert(err.message)
          console.log(err);
        }
      });
  }

}
