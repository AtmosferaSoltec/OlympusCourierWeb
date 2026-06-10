import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  signal,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BotonComponent } from '../../../components/boton.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
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
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    BotonComponent,
    SelectComponent,
  ],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-p-100 flex items-center justify-center">
            <mat-icon class="text-p-600 !text-[18px]">tune</mat-icon>
          </div>
          <span class="text-sm font-semibold text-t">Filtros de búsqueda</span>
        </div>
        <div class="flex gap-2">
          <app-boton icon="search" text="Buscar" (clickEvent)="filtrar()"></app-boton>
          <app-boton icon="add" text="Añadir" (clickEvent)="toAgregar()"></app-boton>
        </div>
      </div>

      <form class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">

        <!-- Estado -->
        <app-select
          label="Estado"
          [items]="estadoOpciones"
          bindLabel="label"
          bindValue="value"
          [ngModel]="repartosService.activo()"
          (ngModelChange)="repartosService.activo.set($event ?? 'T')"
        ></app-select>

        <!-- Estado Envío -->
        <app-select
          label="Estado Envío"
          [items]="estadoEnvioOpciones"
          bindLabel="label"
          bindValue="value"
          [ngModel]="repartosService.estadoEnvio()"
          (ngModelChange)="repartosService.estadoEnvio.set($event ?? 'T')"
        ></app-select>

        <!-- N° Reparto -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-textos uppercase tracking-wide">N° Reparto</label>
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
          <label class="text-xs font-medium text-textos uppercase tracking-wide">Cliente</label>
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
          <label class="text-xs font-medium text-textos uppercase tracking-wide">Período</label>
          <input
            #dateRange
            type="text"
            placeholder="Fecha inicio → Fecha fin"
            readonly
            class="bg-gray-50 border border-gray-200 text-t text-sm rounded-lg focus:ring-2 focus:ring-p-300 focus:border-p-400 px-3 py-2.5 outline-none transition-all cursor-pointer w-full"
          />
        </div>

        <!-- Usuario -->
        <app-select
          label="Usuario"
          [items]="usuariosSelect()"
          bindLabel="nombres"
          bindValue="id"
          [searchable]="true"
          [ngModel]="repartosService.idUsuario()"
          (ngModelChange)="repartosService.idUsuario.set($event ?? 0)"
        ></app-select>

        <!-- Subido por -->
        <app-select
          label="Subido por"
          [items]="usuariosSelect()"
          bindLabel="nombres"
          bindValue="id"
          [searchable]="true"
          [ngModel]="repartosService.idSubido()"
          (ngModelChange)="repartosService.idSubido.set($event ?? 0)"
        ></app-select>

        <!-- Vehículo -->
        <app-select
          label="Vehículo"
          [items]="vehiculosSelect()"
          bindLabel="nombre"
          bindValue="id"
          [searchable]="true"
          [ngModel]="repartosService.idVehiculo()"
          (ngModelChange)="repartosService.idVehiculo.set($event ?? 0)"
        ></app-select>

      </form>
    </div>
  `,
})
export class FiltrosComponent implements OnInit, AfterViewInit {
  @ViewChild('dateRange') dateRangeRef!: ElementRef;

  repartosService = inject(RepartosService);
  router          = inject(Router);
  usuarioService  = inject(UsuarioService);
  vehiculoService = inject(VehiculoService);

  listUsuarios = signal<Usuario[]>([]);
  listVehiculos = signal<Vehiculo[]>([]);

  estadoOpciones = [
    { value: 'T', label: 'Todos' },
    { value: 'S', label: 'Activos' },
    { value: 'N', label: 'Inactivos' },
  ];

  estadoEnvioOpciones = [
    { value: 'T', label: 'Todos' },
    { value: 'P', label: 'Pendientes' },
    { value: 'C', label: 'En Ruta' },
    { value: 'E', label: 'Entregados' },
    { value: 'A', label: 'Anulados' },
  ];

  usuariosSelect = computed(() => [
    { id: 0, nombres: 'Todos' },
    ...this.listUsuarios().map(u => ({
      id: u.id ?? 0,
      nombres: (u.nombres ?? '').toUpperCase(),
    })),
  ]);

  vehiculosSelect = computed(() => [
    { id: 0, nombre: 'Todos' },
    ...this.listVehiculos().map(v => ({
      id: v.id ?? 0,
      nombre: (v.nombre ?? '').toUpperCase(),
    })),
  ]);

  ngOnInit(): void {
    this.getAllUsuarios();
    this.getAllVehiculos();
  }

  ngAfterViewInit(): void {
    // Flatpickr
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
        if (res?.isSuccess) this.listUsuarios.set(res.data);
        else alert(res?.mensaje || 'Error al obtener los usuarios');
      },
      error: (err: any) => alert(err.message),
    });
  }

  getAllVehiculos() {
    this.vehiculoService.getAll('S').subscribe({
      next: (res) => {
        if (res?.isSuccess) this.listVehiculos.set(res.data);
        else alert(res?.mensaje || 'Error al obtener los vehiculos');
      },
      error: (err: any) => alert(err.message),
    });
  }

  filtrar() { this.repartosService.getAll(); }
  toAgregar() { this.router.navigateByUrl('/menu/agregar-reparto'); }

  setNumReparto(event: any) {
    this.repartosService.numReparto.set((event.target as HTMLInputElement).value);
  }

  setNomCliente(event: any) {
    this.repartosService.nomCliente.set((event.target as HTMLInputElement).value);
  }
}
