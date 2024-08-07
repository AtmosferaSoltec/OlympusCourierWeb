import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Reparto } from '../../interfaces/reparto';
import { RepartoService } from '../../services/reparto.service';
import { PaqueteService } from '../../services/paquete.service';
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import Swal from 'sweetalert2';
import { ComprobanteService } from '../../services/comprobante.service';
import { FormatNumPipe } from "../../pipes/format-num.pipe";
import { GenerarComprobanteService } from './generar-comprobante.service';
import { ConsultasService } from '../../services/consultas.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MostrarContenidoPipe } from '../../pipes/mostrar-contenido.pipe';

@Component({
  selector: 'app-generar-comprobante',
  standalone: true,
  templateUrl: './generar-comprobante.component.html',
  styleUrl: './generar-comprobante.component.css',
  imports: [
    CommonModule, MatIconModule, RouterOutlet,
    FormatNumPipe, MatButtonModule, MatTooltipModule,
    FormsModule, FormatNumPipe,
    MatProgressSpinnerModule, MostrarContenidoPipe
  ]
})
export class GenerarComprobanteComponent implements OnInit, OnDestroy {


  generarComprobanteService = inject(GenerarComprobanteService)
  consultaService = inject(ConsultasService)

  serie_f = signal<string>('F001');
  num_f = signal<number>(0);
  serie_b = signal<string>('B001');
  num_b = signal<number>(0);

  loading = signal<boolean>(false);
  tipoComprobante = signal<number>(2)
  listMetodoPago = computed(() => this.generarComprobanteService.listMetodoPago())
  empresaService = inject(EmpresaService)
  router = inject(Router)
  repartoService = inject(RepartoService)
  reparto: Reparto | null = null;
  paqueteService = inject(PaqueteService)
  comprobanteService = inject(ComprobanteService)

  metodoPago = '';
  num_operacion = '';
  doc = '';
  nombre = '';
  direc = '';
  telefono = '';
  correo = '';

  ngOnDestroy(): void {
    this.generarComprobanteService.reset();
  }

  getTotal(): number {
    const list = this.generarComprobanteService.listRepartos();
    let total = 0;
    list.forEach((item: any) => {
      total += item.total;
    })
    return total;
  }

  ngOnInit(): void {

    //Verificar si hay repartos seleccionados
    if (this.generarComprobanteService.listRepartos().length === 0) {
      this.router.navigate(['menu', 'pagos'])
    }

    this.generarComprobanteService.listarMetodosPago();

    //Obtener serie y numero de comprobante
    this.empresaService.get().subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          this.serie_f.set(res.data.serie_f);
          this.num_f.set(res.data.num_f + 1);
          this.serie_b.set(res.data.serie_b);
          this.num_b.set(res.data.num_b + 1);
        }
      }
    })
  }


  back() {
    this.router.navigate(['menu', 'pagos'])
  }

  setTipoComprobante(valor: 1 | 2) {
    this.tipoComprobante.set(valor)
  }

  isLoadingSearchDoc = signal<boolean>(false);

  async buscarDoc() {
    this.isLoadingSearchDoc.set(true);
    if (this.doc) {
      if (this.tipoComprobante() === 1) {
        const data = await this.consultaService.searchDoc(this.doc, 'ruc')

        this.nombre = data?.nombres
        this.direc = data?.direc
        this.correo = data?.correo
        this.telefono = data?.telefono
      }

      if (this.tipoComprobante() === 2) {
        const data = await this.consultaService.searchDoc(this.doc, 'dni')
        if (data) {
          this.nombre = data?.nombres
          this.direc = data?.direc
          this.correo = data?.correo
          this.telefono = data?.telefono

        }
      }
    }
    this.isLoadingSearchDoc.set(false);
  }

  isLoading = signal<boolean>(false);

  generarComprobante() {
    this.isLoading.set(true);

    //Hacer validciones en el formulario

    //Verificar si el tipo de comprobante coincide con el tipo de documento
    if (this.tipoComprobante() == 1) {
      if (this.doc?.length !== 11) {
        Swal.fire({
          title: 'Error',
          text: 'El documento debe tener 11 dígitos',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        this.isLoading.set(false);
        return;
      }
    } else if (this.tipoComprobante() == 2) {
      if (this.doc?.length !== 8 && this.doc?.length !== 9) {
        Swal.fire({
          title: 'Error',
          text: 'El documento debe tener 8 o 9 dígitos',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        this.isLoading.set(false);
        return;
      }
    }

    let tipoDoc = 1

    if (this.tipoComprobante() == 1) {
      tipoDoc = 6;
    } else if (this.tipoComprobante() == 2) {
      if (this.doc.length == 8) {
        tipoDoc = 1;
      } else if (this.doc.length == 9) {
        tipoDoc = 4;
      }
    }

    const body = {
      tipo_comprobante: this.tipoComprobante(),
      id_metodo_pago: this.metodoPago,
      num_operacion: this.num_operacion,
      foto_operacion: null,
      tipo_doc: tipoDoc,
      documento: this.doc,
      nombre: this.nombre,
      direc: this.direc,
      correo: this.correo,
      telefono: this.telefono,
      repartos: this.generarComprobanteService.listRepartos().map((item) => {
        return item.id
      })
    }

    this.comprobanteService.insert(body).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          Swal.fire({
            title: 'Éxito',
            text: 'Comprobante generado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.router.navigate(['menu', 'comprobantes'])
        } else {
          Swal.fire({
            title: 'Error',
            text: res?.mensaje ?? 'Error al generar comprobante',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        this.loading.set(false);
        console.log(err.message);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }
}
