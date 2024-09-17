import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BotonComponent } from '../../../../components/boton/boton.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgregarRepartoService } from '../../agregar-reparto.service';
import { Cliente } from '../../../../interfaces/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { FormatTelfPipe } from '../../../../pipes/format-telf.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../../../../components/dialog-add-cliente/dialog-add-cliente.component';
import { DetalleItemComponent } from '../../../../components/detalle-item/detalle-item.component';
import { DetalleClienteComponent } from '../detalle-cliente/detalle-cliente.component';

@Component({
  selector: 'app-search-cliente',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    BotonComponent,
    MatTooltipModule,
    ReactiveFormsModule,
    FormatTelfPipe,
    DetalleClienteComponent
  ],
  templateUrl: './search-cliente.component.html'
})
export class SearchClienteComponent {
  bool = signal(false);

  data$: Cliente[] = [];
  showSugerencias = false;
  isLoading = false;
  clienteService = inject(ClienteService);
  service = inject(AgregarRepartoService);
  dialog = inject(MatDialog);
  formulario = new FormGroup({
    buscador: new FormControl(''),
  });

  borrarCliente() {
    this.formulario.reset();
    this.service.cliente.set(null);
  }

  openDialogCliente() {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      width: '950px',
      data: this.service.cliente(),
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.clienteService.getCliente(data).subscribe({
          next: (res: any) => {
            this.service.cliente.set(res.data);
          },
          error: (err: any) => console.log(err),
        });
      }
    });
  }
  
  selectCliente(item: Cliente) {
    this.service.cliente.set(item);
    this.formulario.get('buscador')?.setValue(item.nombres ?? '');
    this.showSugerencias = false;
    this.data$ = [];
  }
  clear() {
    this.showSugerencias = false;
    this.formulario.reset();
  }

  search() {
    const buscador = this.formulario.get('buscador')?.value;
    if (!buscador) {
      return;
    }
    if (this.service.cliente()) {
      return;
    }
    this.isLoading = true;
    this.showSugerencias = true;
    this.clienteService.searchCliente(buscador).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data?.isSuccess) {
          this.data$ = data.data;
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
