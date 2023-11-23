import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../dialog-add-cliente/dialog-add-cliente.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-buscar-cliente-reparto',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './buscar-cliente-reparto.component.html',
  styleUrl: './buscar-cliente-reparto.component.css'
})
export class BuscarClienteRepartoComponent {

  @Output() clienteEmit = new EventEmitter<Cliente | undefined>();
  cliente: Cliente | undefined;

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
  dialog = inject(MatDialog)

  buscarCliente() {
    if (!this.documento.value) {
      return;
    }
    if (this.cliente) {
      return;
    }
    this.isLoading = true;
    this.showSugerencias = true;
    this.clienteService.searchCliente(this.documento.value).subscribe({
      next: data => {
        this.data$ = data;
        this.isLoading = false;
      },
      error: error => {
        console.log(error)
        this.isLoading = false;
      }
    });
  }

  borrarCliente() {
    this.cliente = undefined;
    this.documento.setValue('');
    this.clienteEmit.emit(undefined);
  }

  openDialogCliente() {
    const dialogRef = this.dialog.open(DialogAddClienteComponent, {
      width: "950px",
      data: this.cliente,
    })

    dialogRef.afterClosed().subscribe((data: Cliente) => {
      if (data) {
        this.cliente = data
      }
    })
  }

  selectCliente(item: Cliente) {
    this.cliente = item;
    this.documento.setValue(item.nombres ? item.nombres : this.documento.value)
    this.showSugerencias = false
    this.data$ = []
    this.clienteEmit.emit(item);
  }
}
