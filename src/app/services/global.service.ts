import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

  exportarList(list: any[], fileName: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName + '.xlsx');
  }
}
