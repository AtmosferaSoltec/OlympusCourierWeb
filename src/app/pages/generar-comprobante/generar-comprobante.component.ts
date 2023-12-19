import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MostrarIDPipe } from "../../pipes/mostrar-id.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Reparto } from '../../interfaces/reparto';
import { RepartoService } from '../../services/reparto.service';
import { ShowTipoPaquetePipe } from "../../pipes/show-tipo-paquete.pipe";
import { PaqueteService } from '../../services/paquete.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { FormatNumComprobantePipe } from "../../pipes/format-num-comprobante.pipe";
import Swal from 'sweetalert2';
import { ComprobanteService } from '../../services/comprobante.service';
import { MetodoPagoService } from '../../services/metodo-pago.service';

@Component({
  selector: 'app-generar-comprobante',
  standalone: true,
  templateUrl: './generar-comprobante.component.html',
  styleUrl: './generar-comprobante.component.scss',
  imports: [CommonModule, MatIconModule, RouterOutlet, MostrarIDPipe, MatButtonModule, MatTooltipModule, ShowTipoPaquetePipe, ReactiveFormsModule, FormatNumComprobantePipe]
})
export class GenerarComprobanteComponent implements OnInit {


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
  private actRoute = inject(ActivatedRoute)
  paqueteService = inject(PaqueteService)
  comprobanteService = inject(ComprobanteService)
  id: number = 0;
  formulario: FormGroup

  constructor(private fb: FormBuilder) {
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

  ngOnInit(): void {
    //Obtener el id del reparto
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerReparto(this.id);
    });

    //Verificar si ya existe un comprobante para este reparto
    this.comprobanteService.get(this.id).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          Swal.fire({
            title: 'Error',
            text: 'Ya existe un comprobante para este reparto',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          this.router.navigate(['/menu', '/comprobantes'])
        }
      },
      error: (err: any) => console.log(err.message)
    });

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

  obtenerReparto(id: number) {
    this.repartoService.get(id).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          this.reparto = res.data;
          this.formulario.controls['doc'].setValue(this.reparto?.cliente?.documento);
          this.formulario.controls['nombre'].setValue(this.reparto?.cliente?.nombres);
          this.formulario.controls['direc'].setValue(this.reparto?.cliente?.direc);
          this.formulario.controls['telefono'].setValue(this.reparto?.cliente?.telefono);
          this.formulario.controls['correo'].setValue(this.reparto?.cliente?.correo);
        }
      }
    })
  }

  back() {
    this.router.navigate(['/menu/detalle-reparto', this.id]);
  }

  setTipoComprobante(valor: 1 | 2) {
    this.tipoComprobante.set(valor)
  }

  generarComprobante() {
    if (this.formulario.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Ingrese los campos requeridos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }

    //Verificar si el tipo de comprobante coincide con el tipo de documento
    if (this.tipoComprobante() == 1 && this.formulario.get('doc')?.value.length != 11) {
      Swal.fire({
        title: 'Error',
        text: 'El documento debe tener 11 dígitos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    } else if (this.tipoComprobante() == 2 && this.formulario.get('doc')?.value.length != 8) {
      Swal.fire({
        title: 'Error',
        text: 'El documento debe tener 8 dígitos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }

    this.loading.set(true);
    let tipoDoc = 1

    if (this.tipoComprobante() == 1) {
      tipoDoc = 6;
    } else if (this.tipoComprobante() == 2) {
      tipoDoc = 1;
    }

    const data = {
      id_reparto: this.id,
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
    }

    this.comprobanteService.insert(data).subscribe({
      next: (res: any) => {
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
      }
    })
  }
}
