import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Reparto, RepartoNew } from '../interfaces/reparto';
import { format, parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  exportarList2(
    data: any[],
    nombreHoja: string,
    workbook: XLSX.WorkBook = XLSX.utils.book_new()
  ): XLSX.WorkBook {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja);
    return workbook;
  }

  exportarVariasListas(
    parametros: { nombreHoja: string; data: any[] }[],
    nombreExcel: string
  ) {
    let workbook: XLSX.WorkBook = XLSX.utils.book_new();
    for (const parametro of parametros) {
      workbook = this.exportarList2(
        parametro.data,
        parametro.nombreHoja,
        workbook
      );
    }
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, nombreExcel + '.xlsx');
  }

  exportarListRepartos(list: RepartoNew[]) {
    const listExcel = this.convertirListReparto(list);
    console.log(list);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja 1');
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'REPARTOS' + '.xlsx');
  }

  convertirListReparto(list: RepartoNew[]): any[] {
    const listExcel: any = [];
    list.forEach((reparto) => {
      const item = {
        FECHA_CREACION: reparto.fecha_creacion
          ? format(reparto.fecha_creacion, 'dd/MM/yyyy')
          : '',
        HORA: reparto.fecha_creacion
          ? format(reparto.fecha_creacion, 'hh:mm a')
          : '',
        ESTADO_ENCOMIENDA:
          reparto.estado === 'P'
            ? 'Pendiente'
            : reparto.estado === 'E'
            ? 'Entregado'
            : reparto.estado === 'C'
            ? 'En Curso'
            : reparto.estado === 'A'
            ? 'Anulado'
            : '',
        USUARIO: reparto.usuario,
        ENTREGADO: reparto.entregado,
        CLIENTE: reparto.cliente,
        TELF: reparto.telefono,
        GUIAS: reparto.items?.map((item) => item.num_guia).join(','),
        DETALLE: reparto.items?.map((item) => item.detalle).join(','),
        CLAVES: reparto.items?.map((item) => item.clave).join(','),
        DIRECCION: reparto.direccion,
        DISTRITO: reparto.distrito,
        COBRO_ADICIONAL: Number(reparto.costo_adicional),
        COBRO_REPARTO: Number(reparto.costo_reparto),
        TOTAL: Number(
          (reparto.costo_adicional ?? 0) + (reparto.costo_reparto ?? 0)
        ),
        URL_MAPS: reparto?.maps,
      };
      //const entregado = reparto.historial?.find((item: any) => item.id_tipo_operacion === 4);
      /*

      const item = {
        FECHA_CREACION: reparto.fecha_creacion ? format(parseISO(reparto.fecha_creacion), 'dd/MM/yyyy') : '',
        HORA: reparto.fecha_creacion ? format(parseISO(reparto.fecha_creacion), 'hh:mm a') : '',
        ESTADO_ENCOMIENDA: reparto.estado === 'P' ? 'Pendiente' : reparto.estado === 'E' ? 'Entregado' : reparto.estado === 'A' ? 'Anulado' : '',
        USUARIO: reparto?.historial && reparto.historial.length > 0 ? reparto.historial[0].nombre : '',
        ENTREGADO: entregado?.nombre,
        CLIENTE: reparto.cliente?.nombres,
        TELF: reparto.cliente?.telefono,
        GUIAS: reparto.items?.map((item: any) => item.num_guia).join(','),
        DETALLE: reparto.items?.map((item: any) => item.detalle).join(','),
        CLAVES: reparto.items?.map((item: any) => item.clave).join(','),
        DIRECCION: reparto.cliente?.direc,
        DISTRITO: reparto.cliente?.distrito,
        //COBRO_ADICIONAL: reparto?.items?.reduce((total, item) => total + (Number(item.adicional) || 0), 0),
        TOTAL: Number(reparto.total)
      }
      */

      listExcel.push(item);
    });
    return listExcel;
  }

  exportarList(list: any[], fileName: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, fileName + '.xlsx');
  }
}
