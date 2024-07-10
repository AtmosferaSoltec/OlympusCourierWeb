import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Reparto } from '../interfaces/reparto';
import { format, parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  exportarList2(data: any[], nombreHoja: string, workbook: XLSX.WorkBook = XLSX.utils.book_new()): XLSX.WorkBook {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja);
    return workbook;
  }

  exportarVariasListas(parametros: { nombreHoja: string, data: any[] }[], nombreExcel: string) {
    let workbook: XLSX.WorkBook = XLSX.utils.book_new();
    for (const parametro of parametros) {
      workbook = this.exportarList2(parametro.data, parametro.nombreHoja, workbook);
    }
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, nombreExcel + '.xlsx');
  }

  exportarListRepartos(list: Reparto[]) {
    const listExcel = this.convertirListReparto(list)
    console.log(list);


    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja 1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'REPARTOS' + '.xlsx');
  }

  convertirListReparto(list: Reparto[]): any[] {
    const listExcel: any = []
    list.forEach((reparto) => {
      const entregado = reparto.historial?.find((item) => item.id_tipo_operacion === 4);
      const item = {
        FECHA_CREACION: reparto.fecha_creacion ? format(parseISO(reparto.fecha_creacion), 'dd/MM/yyyy hh:mm a') : '',
        ESTADO_ENCOMIENDA: reparto.estado === 'P' ? 'Pendiente' : reparto.estado === 'E' ? 'Entregado' : reparto.estado === 'A' ? 'Anulado' : '',
        USUARIO: reparto?.historial && reparto.historial.length > 0 ? reparto.historial[0].nombre : '',
        ENTREGADO: entregado?.nombre,
        CLIENTE: reparto.cliente?.nombres,
        GUIAS: reparto.items?.map((item) => item.num_guia).join(','),
        DETALLE: reparto.items?.map((item) => item.detalle).join(','),
        CLAVES: reparto.items?.map((item) => item.clave).join(','),
        DIRECCION: reparto.cliente?.direc,
        DISTRITO: reparto.cliente?.distrito,
        COBRO_ADICIONAL: reparto?.items?.reduce((total, item) => total + (Number(item.adicional) || 0), 0),
        TOTAL: Number(reparto.total)
      }

      listExcel.push(item);
    })
    return listExcel;
  }

  exportarList(list: any[], fileName: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName + '.xlsx');
  }
}
