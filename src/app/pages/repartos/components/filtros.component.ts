import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BotonComponent } from '../../../components/boton.component';
import { Router } from '@angular/router';
import { RepartosService } from '../repartos.service';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../interfaces/vehiculo';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

@Component({
  selector: 'app-filtros',
  imports: [CommonModule, MatIconModule, MatButtonModule, BotonComponent],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-lg bg-p-100 flex items-center justify-center"
          >
            <mat-icon class="text-p-600 !text-[18px]">tune</mat-icon>
          </div>
          <span class="text-sm font-semibold text-t">Filtros de búsqueda</span>
        </div>
        <div class="flex gap-2">
          <app-boton
            icon="search"
            text="Buscar"
            (clickEvent)="filtrar()"
          ></app-boton>
          <app-boton
            icon="add"
            text="Añadir"
            (clickEvent)="toAgregar()"
          ></app-boton>
        </div>
      </div>

      <form
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
      >
        <!-- Estado -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-textos uppercase tracking-wide"
            >Estado</label
          >
          <select
            [value]="repartosService.activo()"
            (change)="setActivo($event)"
            class="bg-gray-50 border border-gray-200 text-t text-sm rounded-lg focus:ring-2 focus:ring-p-300 focus:border-p-400 px-3 py-2.5 outline-none transition-all cursor-pointer"
          >
            <option value="T">Todos</option>
            <option value="S">Activos</option>
            <option value="N">Inactivos</option>
          </select>
        </div>

        <!-- Estado Envío -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-textos uppercase tracking-wide"
            >Estado Envío</label
          >
          <select
            [value]="repartosService.estadoEnvio()"
            (change)="setEstadoEnvio($event)"
            class="bg-gray-50 border border-gray-200 text-t text-sm rounded-lg focus:ring-2 focus:ring-p-300 focus:border-p-400 px-3 py-2.5 outline-none transition-all cursor-pointer"
          >
            <option value="T">Todos</option>
            <option value="P">Pendientes</option>
            <option value="C">En Ruta</option>
            <option value="E">Entregados</option>
            <option value="A">Anulados</option>
          </select>
        </div>

        <!-- N° Reparto -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-textos uppercase tracking-wide"
            >N° Reparto</label
          >
          <input
            [value]="repartosService.numReparto()"
            (change)="setNumReparto($event)"
            type="text"
            placeholder="Ej: 00123"
            class="bg-gray-50 border border-gray-200 text-t text-sm rounded-lg focus:ring-2 focus:ring-p-300 focus:border-p-400 px-3 py-2.5 outline-none transition-all placeholder:text-gray-300"
          />
        </div>

        <!-- Nombre Cliente -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-textos uppercase tracking-wide"
            >Cliente</label
          >
          <input
            [value]="repartosService.nomCliente()"
            (change)="setNomCliente($event)"
            type="text"
            placeholder="Nombre del cliente"
            class="bg-gray-50 border border-gray-200 text-t text-sm rounded-lg focus:ring-2 focus:ring-p-300 focus:border-p-400 px-3 py-2.5 outline-none transition-all placeholder:text-gray-300"
          />
        </div>

        <!-- Período -->
        <div class="flex flex-col gap-1 col-span-2 xl:col-span-1">
          <label class="text-xs font-medium text-textos uppercase tracking-wide"
            >Período</label
          >
          <input
            #dateRange
            type="text"
            placeholder="Fecha inicio → Fecha fin"
            readonly
            class="bg-gray-50 border border-gray-200 text-t text-sm rounded-lg focus:ring-2 focus:ring-p-300 focus:border-p-400 px-3 py-2.5 outline-none transition-all cursor-pointer w-full"
          />
        </div>

        <!-- Usuario -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-textos uppercase tracking-wide"
            >Usuario</label
          >
          <select
            [value]="repartosService.idUsuario()"
            (change)="setIdUsuario($event)"
            class="bg-gray-50 border border-gray-200 text-t text-sm rounded-lg focus:ring-2 focus:ring-p-300 focus:border-p-400 px-3 py-2.5 outline-none transition-all cursor-pointer"
          >
            <option value="0">Todos</option>
            @for (item of listUsuarios(); track $index) {
              <option [value]="item.id">{{ item.nombres | uppercase }}</option>
            }
          </select>
        </div>

        <!-- Subido por -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-textos uppercase tracking-wide"
            >Subido por</label
          >
          <select
            [value]="repartosService.idSubido()"
            (change)="setIdSubido($event)"
            class="bg-gray-50 border border-gray-200 text-t text-sm rounded-lg focus:ring-2 focus:ring-p-300 focus:border-p-400 px-3 py-2.5 outline-none transition-all cursor-pointer"
          >
            <option value="0">Todos</option>
            @for (item of listUsuarios(); track $index) {
              <option [value]="item.id">{{ item.nombres | uppercase }}</option>
            }
          </select>
        </div>

        <!-- Vehículo -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-textos uppercase tracking-wide"
            >Vehículo</label
          >
          <select
            [value]="repartosService.idVehiculo()"
            (change)="setIdVehiculo($event)"
            class="bg-gray-50 border border-gray-200 text-t text-sm rounded-lg focus:ring-2 focus:ring-p-300 focus:border-p-400 px-3 py-2.5 outline-none transition-all cursor-pointer"
          >
            <option value="0">Todos</option>
            @for (item of listVehiculos(); track $index) {
              <option [value]="item.id">{{ item.nombre | uppercase }}</option>
            }
          </select>
        </div>
      </form>
    </div>
  `,
})
export class FiltrosComponent implements OnInit, AfterViewInit {
  @ViewChild('dateRange') dateRangeRef!: ElementRef;

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

  ngAfterViewInit(): void {
    const toISO = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    const initialDates: string[] = [];
    if (this.repartosService.desde()) initialDates.push(this.repartosService.desde());
    if (this.repartosService.hasta()) initialDates.push(this.repartosService.hasta());

    flatpickr(this.dateRangeRef.nativeElement, {
      mode: 'range',
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd/m/Y',
      locale: { ...Spanish, rangeSeparator: ' → ' },
      defaultDate: initialDates.length === 2 ? initialDates : undefined,
      onChange: (selectedDates: Date[]) => {
        if (selectedDates.length === 2) {
          this.repartosService.desde.set(toISO(selectedDates[0]));
          this.repartosService.hasta.set(toISO(selectedDates[1]));
        } else if (selectedDates.length === 0) {
          this.repartosService.desde.set('');
          this.repartosService.hasta.set('');
        }
      },
    });
  }

  getAllUsuarios() {
    this.usuarioService.getAll({ estado: 'S' }).subscribe({
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
      },
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

  setIdVehiculo(event: any) {
    this.repartosService.idVehiculo.set(event.target.value);
  }
}
