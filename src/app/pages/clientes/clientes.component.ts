import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddClienteComponent } from '../../components/dialog-add-cliente/dialog-add-cliente.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    FiltrosComponent, TablaComponent, MatTooltipModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  name: string = "Joel";

  listClientes: Cliente[] = []

  clienteService = inject(ClienteService);

  constructor() {
    this.clienteService.listarClientes().subscribe({
      next: data => this.listClientes = data
    })
  }

  exportar() {
    this.clienteService.exportClientes(this.listClientes);
  }

  dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      width: "950px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
