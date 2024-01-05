import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { DialogAddClienteComponent } from '../../../../components/dialog-add-cliente/dialog-add-cliente.component';
import { Cliente } from '../../../../interfaces/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { AgregarRepartoService } from '../../agregar-reparto.service';
import { FormatTelfPipe } from "../../../../pipes/format-telf.pipe";
import { BotonComponent } from '../../../../components/boton/boton.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-buscar-cliente',
  standalone: true,
  templateUrl: './buscar-cliente.component.html',
  styleUrl: './buscar-cliente.component.scss',
  imports: [
    CommonModule, MatIconModule, MatProgressSpinnerModule,
    ReactiveFormsModule, MatButtonModule, FormatTelfPipe,
    BotonComponent, MatTooltipModule
  ]
})
export class BuscarClienteComponent {

  data$: Cliente[] = [];
  showSugerencias = false;
  isLoading = false;

  formulario: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      buscador: ['']
    })
  }

  clienteService = inject(ClienteService)
  service = inject(AgregarRepartoService)
  dialog = inject(MatDialog)

  buscarCliente() {
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
      error: error => {
        console.log(error)
        this.isLoading = false;
      }
    });
  }

  borrarCliente() {
    this.service.cliente.set(null);
    this.formulario.reset();
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

  selectCliente(item: Cliente) {
    this.service.cliente.set(item);
    this.formulario.get('buscador')?.setValue(item.nombres);
    this.showSugerencias = false
    this.data$ = []
  }
}
