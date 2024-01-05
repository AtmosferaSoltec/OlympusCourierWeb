import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Reparto } from '../../interfaces/reparto';
import { RepartoService } from '../../services/reparto.service';
import { PaqueteService } from '../../services/paquete.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import Swal from 'sweetalert2';
import { ComprobanteService } from '../../services/comprobante.service';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { FormatNumPipe } from "../../pipes/format-num.pipe";
import { GenerarComprobanteService } from './generar-comprobante.service';
import { ConsultasService } from '../../services/consultas.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MostrarContenidoPipe } from '../../pipes/mostrar-contenido.pipe';

@Component({
  selector: 'app-generar-comprobante',
  standalone: true,
  templateUrl: './generar-comprobante.component.html',
  styleUrl: './generar-comprobante.component.scss',
  imports: [
    CommonModule, MatIconModule, RouterOutlet,
    FormatNumPipe, MatButtonModule, MatTooltipModule,
    ReactiveFormsModule, FormatNumPipe,
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
  metodoPagoService = inject(MetodoPagoService)
  empresaService = inject(EmpresaService)
  router = inject(Router)
  repartoService = inject(RepartoService)
  reparto: Reparto | null = null;
  paqueteService = inject(PaqueteService)
  comprobanteService = inject(ComprobanteService)


  formulario: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({

      metodoPago: [1, [Validators.required]],
      num_operacion: [''],
      doc: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      direc: ['', [Validators.required]],
      telefono: ['', [Validators.maxLength(9)]],
      correo: ['', [Validators.email]],
    })
  }

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
    const form = this.formulario.value
    if (form.doc) {
      if (this.tipoComprobante() === 1) {
        const data = await this.consultaService.searchDoc(form.doc, 'ruc')
        this.formulario.get('nombre')?.setValue(data?.nombres)
        this.formulario.get('direc')?.setValue(data?.direc)
        this.formulario.get('correo')?.setValue(data?.correo)
        this.formulario.get('telefono')?.setValue(data?.telefono)
      }

      if (this.tipoComprobante() === 2) {
        const data = await this.consultaService.searchDoc(form.doc, 'dni')
        if (data) {
          this.formulario.get('nombre')?.setValue(`${data?.nombres}`)
          this.formulario.get('direc')?.setValue(data?.direc)
          this.formulario.get('correo')?.setValue(data?.correo)
          this.formulario.get('telefono')?.setValue(data?.telefono)

        }
      }
    }
    this.isLoadingSearchDoc.set(false);
  }

  isLoading = signal<boolean>(false);

  generarComprobante() {
    this.isLoading.set(true);
    const controls = this.formulario.value;
    if (this.formulario.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Ingrese los campos requeridos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      this.isLoading.set(false);
      return;
    }

    //Verificar si el tipo de comprobante coincide con el tipo de documento
    if (this.tipoComprobante() == 1 && controls.doc?.length != 11) {
      Swal.fire({
        title: 'Error',
        text: 'El documento debe tener 11 dígitos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      this.isLoading.set(false);
      return;
    } else if (this.tipoComprobante() == 2 && controls.doc?.length != 8) {
      Swal.fire({
        title: 'Error',
        text: 'El documento debe tener 8 dígitos' + controls.doc,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      this.isLoading.set(false);
      return;
    }

    this.loading.set(true);
    let tipoDoc = 1

    if (this.tipoComprobante() == 1) {
      tipoDoc = 6;
    } else if (this.tipoComprobante() == 2) {
      tipoDoc = 1;
    }

    const body = {
      tipo_comprobante: this.tipoComprobante(),
      id_metodo_pago: this.formulario.get('metodoPago')?.value,
      num_operacion: this.formulario.get('num_operacion')?.value,
      foto_operacion: null,
      tipo_doc: tipoDoc,
      documento: this.formulario.get('doc')?.value,
      nombre: this.formulario.get('nombre')?.value,
      direc: this.formulario.get('direc')?.value,
      correo: this.formulario.get('correo')?.value,
      telefono: this.formulario.get('telefono')?.value,
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
          this.router.navigate(['/menu', '/comprobantes'])
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
