import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Reparto } from '../../models/reparto';
import { Router, RouterOutlet } from '@angular/router';
import { RepartoService } from '../../services/reparto.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe, JsonPipe, formatDate } from '@angular/common';
import moment from 'moment';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { UsuarioService } from '../../services/usuario.service';
import { DocumentoService } from '../../services/documento.service';
import { Documento } from '../../models/documento';
import { Usuario } from '../../models/usuario';
import { DistritoService } from '../../services/distrito.service';
import { Distrito } from '../../models/distrito';
import { registerLocaleData } from '@angular/common';
import localeEsPE from '@angular/common/locales/es-PE';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

registerLocaleData(localeEsPE);

@Component({
  selector: 'app-repartos',
  standalone: true,
  imports: [
    MatButtonModule, CommonModule,
    MatIconModule, MatDatepickerModule,
    MatNativeDateModule, MatDialogModule,
    MatPaginatorModule, MatMenuModule,
    MatTableModule, RouterOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatNativeDateModule,
    MatTooltipModule
  ],
  templateUrl: './repartos.component.html',
  styleUrl: './repartos.component.css',
  providers: [DatePipe]
})
export class RepartosComponent {
  formulario: FormGroup;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  listRepartos: Reparto[] = [];
  loaderRepartos = false;
  columnas: string[] = [
    'id',
    'cliente',
    'fecha',
    'estado',
    'flete',
    'act',
  ];
  bool: boolean = true;
  listTipoDocumento: Documento[] = [];
  listDistrito: Distrito[] = [];
  listUsuario: Usuario[] = [];

  router = inject(Router);
  dialog = inject(MatDialog)
  repartoService = inject(RepartoService);
  distritoService = inject(DistritoService);
  usuarioService = inject(UsuarioService);
  documentoService = inject(DocumentoService);
  private fb = inject(FormBuilder);

  fechaDesde: Date = new Date();
  fechaHasta: Date = new Date();
  datePipe = inject(DatePipe);

  formatearFecha(fecha: Date): string {
    const f = this.datePipe.transform(fecha, 'dd/MM/yyyy') || 'Sin Fecha';
    console.log(f);

    return f
  }

  constructor() {
    this.formulario = this.fb.group({
      tipoDoc: [''],
      doc: [''],
      nombres: [''],
      usuarios: [''],
      distritos: [''],
      tipoComprobante: [''],
      estado: [''],
    })

    this.listarRepartos()
    setTimeout(() => {
      this.bool = false;
    }, 3000);

    this.documentoService.getAll().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listTipoDocumento = data.data;
        }
      }
    });
    this.usuarioService.getAll().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listUsuario = data.data;
        }
      }
    });
    this.distritoService.listarDestinos().subscribe({
      next: (data: any) => {
        if (data && data.isSuccess) {
          this.listDistrito = data.data;
        }
      }
    });

  }

  getEstado(estado: string): string {
    switch (estado) {
      case 'P':
        return 'Pendiente';
      case 'E':
        return 'Entregado';
      case 'A':
        return 'Anulado';
      default:
        return 'Sin Valor';
    }
  }

  async listarRepartos() {
    this.loaderRepartos = true
    this.repartoService.listarRepartos().subscribe({
      next: (data: any) => {
        this.listRepartos = data.data;
      },
      error: error => console.log(error)
    });
    this.loaderRepartos = false;
  }


  formatDate(fecha: string): string {
    const date = moment(fecha);
    return date.format('DD/MM/YYYY HH:mm');
  }


  agregar() {
    this.router.navigateByUrl('/menu/agregar-reparto')
  }

  formatoId(id: number): string {
    const idStr = id.toString().slice(0, 6).padStart(6, '0');
    return `#${idStr}`;
  }


  getTotal(rep: Reparto): number {
    if (rep.items != undefined) {
      return rep.items?.reduce((acumulador, objeto) => acumulador + (objeto.cant * objeto.precio), 0);
    } else {
      return 0
    }
  }

  openDetalle() {
    this.router.navigateByUrl('/menu/detalle-reparto')
  }

  generarComprobante() {

  }


  filtrar() {
    console.log(this.formulario.value);

  }
}
