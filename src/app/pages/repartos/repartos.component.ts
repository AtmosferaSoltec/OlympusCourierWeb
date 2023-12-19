import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { RepartoService } from '../../services/reparto.service';
import Swal from 'sweetalert2';
import { GlobalService } from '../../services/global.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BotonComponent } from '../../components/boton/boton.component';
@Component({
  selector: 'app-repartos',
  standalone: true,
  imports: [
    CommonModule, FiltrosComponent, TablaComponent,
    MatIconModule, MatButtonModule, MatTooltipModule,
    RouterOutlet, ReactiveFormsModule, MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatNativeDateModule,
    BotonComponent
  ],
  templateUrl: './repartos.component.html',
  styleUrl: './repartos.component.scss'
})
export class RepartosComponent {


  router = inject(Router);

  toAgregar() {
    this.router.navigateByUrl('/menu/agregar-reparto')
  }

  formulario = new FormGroup({
    estado: new FormControl<string>('T'),
    estado_envio: new FormControl<string>('T'),
    num_reparto: new FormControl<string>(''),
    cliente: new FormControl<string>(''),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  })

  repartoService = inject(RepartoService)
  globalService = inject(GlobalService)

  filtrar() {
    const estado = this.formulario.controls.estado.value;
    const params = {
      estado: estado === 'T' ? undefined : estado,
      estado_envio: this.formulario.controls.estado_envio.value,
      num_reparto: this.formulario.controls.num_reparto.value,
      cliente: this.formulario.controls.cliente.value,
      start: this.formulario.controls.start.value,
      end: this.formulario.controls.end.value
    }
    this.repartoService.getAll(params)

  }

  exportar() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se exportará la información de los repartos a un archivo Excel",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        const listRepartos = this.repartoService.listRepartos();
        if (!listRepartos) {
          Swal.fire(
            '¡Error!',
            'No se encontró ningún reparto.',
            'error'
          )
          return;
        }

        const listItems: any[] = []
        listRepartos.forEach((reparto) => {
          reparto.items?.forEach((item) => {
            listItems.push(item)
          })
        })

        this.globalService.exportarVariasListas([
          {
            data: listRepartos,
            nombreHoja: 'REPARTOS'
          },
          {
            data: listItems,
            nombreHoja: 'ITEMS'
          }
        ], 'REPARTOS')

        Swal.fire(
          '¡Exportado!',
          'La información ha sido exportada.',
          'success'
        )
      }
    });
  }

}
