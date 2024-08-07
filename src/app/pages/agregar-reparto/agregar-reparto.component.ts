import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
import { SearchClienteComponent } from './components/search-cliente/search-cliente.component';
@Component({
  selector: 'app-agregar-reparto',
  standalone: true,
  imports: [
    CommonModule, TablaItemsComponent, MatIconModule,
    MatButtonModule, FormsModule,
    BotonComponent, TituloComponent, MatTooltipModule, BotonComponent,
    SearchClienteComponent
  ],
  templateUrl: './agregar-reparto.component.html',
  styleUrl: './agregar-reparto.component.scss'
})
export class AgregarRepartoComponent implements OnDestroy {

  vehiculo = 'T'

  service = inject(AgregarRepartoService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  openDialogAddItemReparto() {
    const dialogRef = this.dialog.open(DialogAddItemRepartoComponent, {
      width: "770px"
    });

    dialogRef.afterClosed().subscribe((data: ItemReparto) => {
      if (data) {
        this.service.listItemRepartos().push(data)
      }
    });
  }

  openDialogAddPedido() {
    const dialogRef = this.dialog.open(DialogAddPedidoComponent, {
      width: "990px"
    });

    dialogRef.afterClosed()
      .subscribe(data => {
      });
  }

  ngOnDestroy(): void {
    this.service.reset();
  }


  displayFn(option: any): string {
    return option && option.doc ? option.doc : '';
  }


  back() {
    this.router.navigate(['menu', 'repartos'])
  }

  cancel() {
    if (this.service.cliente() && this.service.listItemRepartos()) {
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
          this.router.navigate(['menu', 'repartos'])
        }
      });
    } else {
      this.router.navigate(['menu', 'repartos'])
    }
  }


  getTotal() {
    return this.service.listItemRepartos().reduce((total, item) => total + (item?.precio || 0), 0);
  }

  guardarReparto() {

    if (!this.service.cliente()?.id) {
      Swal.fire({
        icon: 'question',
        title: 'Sin Cliente',
        text: 'Debes ingresar un cliente',
        confirmButtonText: "Continuar",
        confirmButtonColor: "#047CC4",
      });
      return;
    }

    if (this.service.listItemRepartos().length === 0) {
      Swal.fire({
        icon: 'question',
        title: 'Sin Items',
        text: 'Ingresa minimo un item',
        confirmButtonText: "Continuar",
        confirmButtonColor: "#047CC4",
      });
      return;
    }

    const body = {
      anotacion: '',
      id_vehiculo: this.vehiculo,
      id_cliente: this.service.cliente()?.id,
      items: this.service.listItemRepartos()
    }

    this.service.agregarReparto(body);

  }

}
