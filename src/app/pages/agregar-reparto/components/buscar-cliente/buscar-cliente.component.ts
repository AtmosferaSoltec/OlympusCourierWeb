import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { DialogAddClienteComponent } from '../../../../components/dialog-add-cliente/dialog-add-cliente.component';
import { Cliente } from '../../../../interfaces/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { AgregarRepartoService } from '../../agregar-reparto.service';
import { DialogAddItemRepartoComponent } from '../../../../components/dialog-add-item-reparto/dialog-add-item-reparto.component';
import { ItemReparto } from '../../../../interfaces/item-reparto';
import { FormatTelfPipe } from "../../../../pipes/format-telf.pipe";
import { BotonComponent } from '../../../../components/boton/boton.component';

@Component({
  selector: 'app-buscar-cliente',
  standalone: true,
  templateUrl: './buscar-cliente.component.html',
  styleUrl: './buscar-cliente.component.scss',
  imports: [
    CommonModule, MatIconModule, MatProgressSpinnerModule,
    ReactiveFormsModule, MatButtonModule, FormatTelfPipe,
    BotonComponent
  ]
})
export class BuscarClienteComponent {

  documento = new FormControl('')
  data$: Cliente[] = [];
  showSugerencias = false;
  isLoading = false;

  constructor() {
    this.documento.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.buscarCliente();
    });
  }

  clienteService = inject(ClienteService)
  service = inject(AgregarRepartoService)
  dialog = inject(MatDialog)

  buscarCliente() {
    if (!this.documento.value) {
      return;
    }
    if (this.service.cliente()) {
      return;
    }
    this.isLoading = true;
    this.showSugerencias = true;
    this.clienteService.searchCliente(this.documento.value).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data?.isSuccess) {
          this.data$ = data.data;
          this.isLoading = false;
        }
      },
      error: error => {
        console.log(error)
        this.isLoading = false;
      }
    });
  }

  borrarCliente() {
    this.service.cliente.set(null);
    this.documento.setValue('');
  }

  openDialogCliente() {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      width: "950px",
      data: this.service.cliente()
    })

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.clienteService.getCliente(data).subscribe({
          next: (res: any) => {

            this.service.cliente.set(res.data);
          },
          error: (err: any) => console.log(err)
        })
      }
    })
  }


  openDialogAddItemReparto() {
    const dialogRef = this.dialog.open(DialogAddItemRepartoComponent, {
      width: "770px"
    });

    dialogRef.afterClosed().subscribe((data: ItemReparto) => {
      if (data) {
        this.service.listItemRepartos.push(data)
        //this.table.renderRows();
      }
    });
  }

  selectCliente(item: Cliente) {
    this.service.cliente.set(item);
    this.documento.setValue(item.nombres ? item.nombres : this.documento.value)
    this.showSugerencias = false
    this.data$ = []
  }
}
