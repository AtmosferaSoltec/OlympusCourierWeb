import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../../../../interfaces/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../../../../components/dialog-add-cliente/dialog-add-cliente.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent {
  listClientes: Cliente[] = []

  constructor(
    private clienteService: ClienteService
  ) {
    this.listarClientes()
  }

  async listarClientes() {
    this.clienteService.listarClientes().subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          this.listClientes = res.data;
        } else {
          console.log(res?.mensaje);
        }
      },
      error: error => console.log(error)
    });
  }


  dialog = inject(MatDialog);

  editCliente(item: Cliente) {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      data: item,
      width: "950px"
    })

    dialogRef.afterClosed().subscribe((data: Cliente) => {
      if (data) {
      }
    });

  }

  eliminar(any: any, any2: any) {

  }
}
