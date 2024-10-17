import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BotonComponent } from '../../../../components/boton/boton.component';
import { Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RepartosService } from '../../repartos.service';
import { Usuario } from '../../../../interfaces/usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { Vehiculo } from '../../../../interfaces/vehiculo';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    BotonComponent,
  ],
  templateUrl: './filtros.component.html',
})
export class FiltrosComponent implements OnInit {
  repartosService = inject(RepartosService);
  router = inject(Router);

  listUsuarios = signal<Usuario[]>([]);
  listVehiculos = signal<Vehiculo[]>([]);

  usuarioService = inject(UsuarioService);
  vehiculoService = inject(VehiculoService);

  
  ngOnInit(): void {
    this.getAllUsuarios();
    this.getAllVehiculos();
  }

  getAllUsuarios() {
    this.usuarioService.getAll({ estado: 'S'}).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          this.listUsuarios.set(res.data);
        } else {
          alert(res?.mensaje || 'Error al obtener los usuarios');
        }
      },
      error: (err: any) => {
        alert(err.message);
      },
    });
  }

  getAllVehiculos() {
    this.vehiculoService.getAll('S').subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          this.listVehiculos.set(res.data);
        } else {
          alert(res?.mensaje || 'Error al obtener los vehiculos');
        }
      },
      error: (err: any) => {
        alert(err.message);
      }
    });
  }

  filtrar() {
    this.repartosService.getAll();
  }
  toAgregar() {
    this.router.navigateByUrl('/menu/agregar-reparto');
  }

  setActivo(event: any) {
    this.repartosService.activo.set(event.target.value);
  }

  setEstadoEnvio(event: any) {
    this.repartosService.estadoEnvio.set(event.target.value);
  }

  setNumReparto(event: any) {
    this.repartosService.numReparto.set(event.target.value);
  }

  setNomCliente(event: any) {
    this.repartosService.nomCliente.set(event.target.value);
  }

  setIdUsuario(event: any) {
    this.repartosService.idUsuario.set(event.target.value);
  }

  setIdSubido(event: any) {
    this.repartosService.idSubido.set(event.target.value);
  }

  setDesde(event: any) {
    this.repartosService.desde.set(event.target.value);
  }

  setHasta(event: any) {
    this.repartosService.hasta.set(event.target.value);
  }

  setIdVehiculo(event: any) {
    this.repartosService.idVehiculo.set(event.target.value);
  }
}
