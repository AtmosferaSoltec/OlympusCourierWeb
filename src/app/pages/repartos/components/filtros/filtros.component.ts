import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BotonComponent } from '../../../../components/boton/boton.component';
import { Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fechaActual } from '../../../../util/funciones'
import { RepartosService } from '../../repartos.service';
import { Usuario } from '../../../../interfaces/usuario';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    ReactiveFormsModule, BotonComponent, MatDatepickerModule,
    MatNativeDateModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './filtros.component.html'
})
export class FiltrosComponent {

  repartosService = inject(RepartosService)
  router = inject(Router)

  listUsuarios = signal<Usuario[]>([]);

  constructor(
    private usuarioService: UsuarioService
  ) {
    const query = {
      estado: 'S'
    }
    usuarioService.getAll(query)
      .subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            this.listUsuarios.set(res.data);
          } else {
            alert(res?.mensaje || 'Error al obtener los usuarios');
          }
        },
        error: (err: any) => {
          alert(err.message);
        }
      })
  }

  filtrar() {
    const controls = this.repartosService.formulario.controls;

    //Validar si la fecha esta bien ingresada
    if (!controls.desde.value) {
      return alert('Ingrese fecha desde valida')
    }
    if (!controls.hasta.value) {
      return alert('Ingrese fecha hasta valida')
    }

    // Validar fechas
    if (controls.desde.value > controls.hasta.value) {
      return alert('La fecha desde no puede ser mayor a la fecha hasta')
    }

    const params = {
      estado: controls.estado.value,
      estado_envio: controls.estado_envio.value,
      num_reparto: controls.num_reparto.value,
      cliente: controls.cliente.value,
      desde: controls.desde.value,
      hasta: controls.hasta.value,
      id_usuario: controls.usuario.value
    }

    //this.repartosService.listarRepartos(params)
    this.repartosService.getAll()
  }
  toAgregar() {
    this.router.navigateByUrl('/menu/agregar-reparto')
  }
}
