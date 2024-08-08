import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MostrarActivoPipe } from '../../../../pipes/mostrar-activo.pipe';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { delay } from 'rxjs';
import { Vehiculo } from '../../../../interfaces/vehiculo';
import { DialogVehiculoComponent } from '../dialogs/dialog-vehiculo/dialog-vehiculo.component';

@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MostrarActivoPipe,
  ],
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.scss',
})
export class VehiculoComponent {
  estado = new FormControl('S');
  vehiculoService = inject(VehiculoService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.estado.valueChanges.subscribe({
      next: (valor: any) => {
        if (!valor) {
          return;
        }
        //this.paqueteService.getAll(valor);
        this.listarVehiculos(valor);
      },
    });

    this.listarVehiculos();
  }

  listVehiculos = signal<Vehiculo[]>([]);
  isLoading = signal(false);

  listarVehiculos(activo: 'S' | 'N' = 'S') {
    this.isLoading.set(true);
    this.vehiculoService
      .getAll(activo)
      .pipe(delay(800))
      .subscribe({
        next: (res) => {
          console.log(res);

          if (res?.isSuccess == true) {
            this.listVehiculos.set(res.data);
          } else {
            alert(res?.mensaje);
          }
        },
        error: (err) => console.log(err),
        complete: () => this.isLoading.set(false),
      });
  }

  openDialog(item: Vehiculo | null = null) {
    const dialogRef = this.dialog.open(DialogVehiculoComponent, {
      data: item,
      width: '770px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.listarVehiculos();
      }
    });
  }

  setEstado(item: Vehiculo, estado: string) {
    let texto = '';
    if (estado == 'N') {
      texto = 'Se eliminara este vehiculo!';
    } else if (estado === 'S') {
      texto = 'Se restaurara este vehiculo!';
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#047CC4',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.setActivo(item.id, estado).subscribe({
          next: (data: any) => {
            if (data?.isSuccess) {
              let title = estado === 'N' ? 'Eliminado!' : 'Restaurado!';
              let text =
                estado === 'N'
                  ? 'El vehiculo ha sido eliminado.'
                  : 'El vehiculo ha sido restaurado.';
              Swal.fire({
                title: title,
                text: text,
                icon: 'success',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#047CC4',
              });
              // Actualizar la lista de distritos
              this.vehiculoService.getAll();
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
          error: (err) => console.log(err),
        });
      }
    });
  }
}
