import { Injectable, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../../components/dialog-add-cliente/dialog-add-cliente.component';
import { ClienteFiltro, ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clienteService = inject(ClienteService);
  dialog = inject(MatDialog);

  listClientes = signal<Cliente[]>([]);
  isLoading = signal<boolean>(false);

  setEstado(id_cliente: number, estado: 'S' | 'N') {
    this.clienteService.setEstado(id_cliente, estado).subscribe({
      next: (data: any) => {
        if (data?.isSuccess) {
          let title = estado === 'N' ? 'Eliminado!' : 'Restaurado!';
          let text =
            estado === 'N' ? 'Cliente eliminado.' : 'Cliente restaurado.';
          Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#047CC4',
          });
          this.listarClientes();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data?.mensaje || 'Error al eliminar',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#047CC4',
          });
        }
      },
      error: (err: any) => {
        alert(err?.mensaje);
        console.log(err);
      },
    });
  }

  listarClientes(filtros?: ClienteFiltro) {
    this.isLoading.set(true);
    this.clienteService
      .getAll(filtros)
      //.pipe(delay(800))
      .subscribe({
        next: (res: any) => {
          this.listClientes.set(res.data);
          /*
          if (res?.isSuccess) {
            this.listClientes.set(res.data)
          } else {
            alert(res?.mensaje);
          }
          */
        },
        error: (err: any) => {
          alert(err.message);
          console.log(err);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  openDialogCliente(): void {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      width: '950px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
