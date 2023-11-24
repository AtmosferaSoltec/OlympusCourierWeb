import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from '../../models/cliente';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ClienteService } from '../../services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../dialog-add-cliente/dialog-add-cliente.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.css'
})
export class TablaClientesComponent {
  listClientes = new MatTableDataSource<Cliente>();
  columnas: string[] = [
    'nombres',
    'tipo',
    'documento',
    'direc',
    'telf',
    'act',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private clienteService: ClienteService
  ) {
    this.listarClientes()
  }

  async listarClientes() {
    this.clienteService.listarClientes().subscribe({
      next: (data: any) => {
        this.listClientes.data = data.data;
      },
      error: error => console.log(error)
    });
  }

  ngAfterViewInit() {
    this.listClientes.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'items por página';
  }

  dialog = inject(MatDialog);


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      width: "950px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

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
}
