import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TablaItemsComponent } from './components/tabla-items/tabla-items.component';
import { AgregarRepartoService } from './agregar-reparto.service';
import { BotonComponent } from '../../components/boton/boton.component';
import { TituloComponent } from '../../components/titulo/titulo.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddItemRepartoComponent } from '../../components/dialog-add-item-reparto/dialog-add-item-reparto.component';
import { ItemReparto } from '../../interfaces/item-reparto';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPedidoComponent } from '../../components/dialog-add-pedido/dialog-add-pedido.component';
import { RepartoService } from '../../services/reparto.service';
import { Reparto } from '../../interfaces/reparto';
import { DistritoService } from '../../services/distrito.service';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { DetalleClienteComponent } from "./components/detalle-cliente/detalle-cliente.component";
@Component({
  selector: 'app-agregar-reparto',
  standalone: true,
  imports: [
    CommonModule,
    TablaItemsComponent,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    BotonComponent,
    TituloComponent,
    MatTooltipModule,
    BotonComponent,
    BuscarClienteComponent,
    DetalleClienteComponent
],
  templateUrl: './agregar-reparto.component.html',
  styleUrl: './agregar-reparto.component.css',
})
export class AgregarRepartoComponent implements OnInit, OnDestroy {
  vehiculo = 'T';

  service = inject(AgregarRepartoService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  repartoService = inject(RepartoService);
  actRoute = inject(ActivatedRoute);

  distritoService = inject(DistritoService)
  reparto?: Reparto;

  ngOnInit(): void {
    this.distritoService.activo.set('S');
    this.distritoService.getAll();
    this.actRoute.params.subscribe((params) => {
      const id = params['id'];
      if (!id) {
        return;
      }
      this.repartoService.get(id)?.subscribe((data: any) => {
        if (data?.isSuccess) {
          const reparto = data.data;
          this.reparto = reparto;
          const cliente = reparto.cliente;
          cliente.id = reparto.id_cliente;
          this.service.client.set(cliente);
          this.service.listItemRepartos.set(reparto.items);
          this.vehiculo = reparto.id_vehiculo;
        } else {
          this.back();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.service.reset();
  }

  openDialogAddItemReparto() {
    const dialogRef = this.dialog.open(DialogAddItemRepartoComponent, {
      width: '770px',
    });

    dialogRef.afterClosed().subscribe((data: ItemReparto) => {
      if (data) {
        this.service.listItemRepartos().push(data);
      }
    });
  }

  openDialogAddPedido() {
    const dialogRef = this.dialog.open(DialogAddPedidoComponent, {
      width: '990px',
    });

    dialogRef.afterClosed().subscribe((data) => {});
  }

  displayFn(option: any): string {
    return option && option.doc ? option.doc : '';
  }

  back() {
    this.router.navigate(['menu', 'repartos']);
  }

  cancel() {
    if (this.service.client() && this.service.listItemRepartos()) {
      Swal.fire({
        title: '¡Alerta de Seguridad!',
        text: '¿Estás seguro de que deseas regresar a la pantalla anterior? Todos los datos ingresados se perderán.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#047CC4',
        cancelButtonColor: '#CF475B',
        confirmButtonText: 'Sí, regresar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['menu', 'repartos']);
        }
      });
    } else {
      this.router.navigate(['menu', 'repartos']);
    }
  }

  getTotal() {
    const f = this.service
      .listItemRepartos()
      .reduce((total, item) => total + (Number(item?.precio) || 0), 0);

    return f;
  }

  guardarReparto() {
    if (!this.service.client()?.id) {
      Swal.fire({
        icon: 'question',
        title: 'Sin Cliente',
        text: 'Debes ingresar un cliente',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#047CC4',
      });
      return;
    }

    if (this.service.listItemRepartos().length === 0) {
      Swal.fire({
        icon: 'question',
        title: 'Sin Items',
        text: 'Ingresa minimo un item',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#047CC4',
      });
      return;
    }

    const body: any = {
      anotacion: '',
      id_vehiculo: this.vehiculo,
      id_cliente: this.service.client()?.id,
      items: this.service.listItemRepartos().map((item) => {
        return {
          adicional: Number(item.adicional),
          clave: item.clave,
          detalle: item.detalle,
          num_guia: item.num_guia,
          precio: Number(item.precio),
        }
      }),
    };

    if (this.reparto) {
      body['id'] = this.reparto.id;
    }

    this.service.agregarReparto(body);
  }
}
