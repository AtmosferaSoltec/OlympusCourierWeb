import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TablaClientesComponent } from '../../components/tabla-clientes/tabla-clientes.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TablaClientesComponent],
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
}
