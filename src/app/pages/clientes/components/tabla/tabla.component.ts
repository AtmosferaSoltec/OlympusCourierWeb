import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../../../../components/dialog-add-cliente/dialog-add-cliente.component';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent {
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
