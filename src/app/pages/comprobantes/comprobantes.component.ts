import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { GlobalService } from '../../services/global.service';
import { TituloComponent } from '../../components/titulo/titulo.component';
import { ComprobantesService } from './comprobantes.service';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { Comprobante } from '../../interfaces/comprobante';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-comprobantes',
  standalone: true,
  templateUrl: './comprobantes.component.html',
  styleUrl: './comprobantes.component.scss',
  imports: [
    CommonModule, MatButtonModule, TituloComponent,
    FiltrosComponent, TablaComponent
  ]
})
export class ComprobantesComponent implements OnDestroy{
  ngOnDestroy(): void {
    this.comprobantesService.reset()
  }

  comprobantesService = inject(ComprobantesService)
  globalService = inject(GlobalService)




  convertirListCompr(list: Comprobante[]): any[] {
    const listExcel: any = []
    list.forEach((compr) => {
      const item = {
        SERIE: compr.serie,
        NUM_SERIE: compr.num_serie,
        document: compr.documento,
        NOMBRE: compr.nombre,
        DIRECCION: compr.direc,
        CORREO: compr.correo,
        TELF: compr.telefono,
        DIRECCIÓN: compr.direc,
        FECHA: compr.fecha_creacion ? format(parseISO(compr.fecha_creacion), 'dd/MM/yyyy') : '',
        HORA: compr.fecha_creacion ? format(parseISO(compr.fecha_creacion), 'hh:mm a') : '',
        ENLACE: compr.enlace,
        ESTADO_SUNAT: compr.estado_sunat,
        SUNAT_DESCRIP: compr.sunat_descrip,
        ENLACE_PDF: compr.enlace_pdf,
        ENLACE_XML: compr.enlace_xml,
        IMPORTE: Number(compr.importe_total),
        USUARIO: compr.usuario,
        METODO_PAGO: compr.metodo_pago
      }

      listExcel.push(item);
    })
    return listExcel;
  }

  exportar() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se exportará la información de los comprobantes a un archivo Excel",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        const convert = this.convertirListCompr(this.comprobantesService.listComprobantes())
        if (!convert) {
          Swal.fire(
            '¡Error!',
            'No se encontró ningún comprobante.',
            'error'
          )
          return;
        }
        this.globalService.exportarList(convert, 'COMPROBANTES');
        Swal.fire(
          '¡Exportado!',
          'La información ha sido exportada.',
          'success'
        )
      }
    });
  }

}
