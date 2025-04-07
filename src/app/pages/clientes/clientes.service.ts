import { Injectable, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../../components/dialog-add-cliente/dialog-add-cliente.component';
import { ClienteFiltro, ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente';
import Swal from 'sweetalert2';
import { delay, lastValueFrom } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clienteService = inject(ClienteService);
  dialog = inject(MatDialog);

  form = new FormGroup({
    estado: new FormControl('S'),
    tipo_doc: new FormControl('0'),
    doc: new FormControl(''),
    cliente: new FormControl(''),
    limit: new FormControl('20'),
  });

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

  listarClientes() {
    const form = this.form.value;
    const filtros: ClienteFiltro = {
      activo: form.estado,
      tipo_doc: form.tipo_doc,
      documento: form.doc,
      nombres: form.cliente,
      limit: form.limit,
    };

    this.isLoading.set(true);
    this.clienteService
      .getAll(filtros)
      .pipe(delay(800))
      .subscribe({
        next: (res: any) => {
          this.listClientes.set(res.data);
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

  async getAll() {
    const form = this.form.value;
    const filtros: ClienteFiltro = {
      activo: form.estado,
      tipo_doc: form.tipo_doc,
      documento: form.doc,
      nombres: form.cliente,
      limit: '10000',
    };
    console.log(filtros);
    
    return lastValueFrom(this.clienteService.getAll(filtros));
  }

  openDialogCliente(): void {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      width: '950px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
