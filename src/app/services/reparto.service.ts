import { Injectable, inject } from '@angular/core';
import { Reparto } from '../models/reparto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RepartoService {
  
  clienteService = inject(ClienteService)
  http = inject(HttpClient);

  listarRepartos(): Observable<Reparto[]> {
    const url = `${environment.baseUrl}/api/repartos`;
    return this.http.get<any>(url);
  }

  /*async listarRepartos(): Promise<Reparto[]> {
    try {
      const col = collection(this.fb, 'Reparto')
      const allRepartos = await getDocs(col);
      const destinos: Reparto[] = [];
      allRepartos.docs.forEach(async doc => {
        const data: any = doc.data();
        const reparto: Reparto = {
          cliente: await this.clienteService.getClienteById(data.idCliente),
          fecha: data.fecha,
          estado: data.estado,
          clave: data.clave,
          anotacion: data.anotacion,
          items: data.items,
        }
        reparto.id = data.id
        destinos.push(reparto);
      });
      return destinos;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener',
        text: 'Hubo un problema al obtener los repartos. Por favor, inténtelo de nuevo más tarde.',
      })
      return []
    }
  }*/

  async insert(item: Reparto): Promise<boolean> {
    return true
    /*
    try {
      const col = collection(this.fb, 'Reparto');
      await addDoc(col, item);
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al insertar',
        text: 'Hubo un problema al insertar el documento. Por favor, inténtelo de nuevo más tarde.',

      })
      return false;
    }*/
  }
}
