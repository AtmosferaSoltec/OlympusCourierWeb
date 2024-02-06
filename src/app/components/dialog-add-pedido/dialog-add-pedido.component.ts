import { Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ItemReparto } from '../../interfaces/item-reparto';
import { PaqueteService } from '../../services/paquete.service';
import { DialogAddItemRepartoComponent } from '../dialog-add-item-reparto/dialog-add-item-reparto.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dialog-add-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './dialog-add-pedido.component.html',
  styleUrl: './dialog-add-pedido.component.scss'
})
export class DialogAddPedidoComponent {


  paqueteService = inject(PaqueteService)

  num_guia: string = '';
  detalle: string = '';
  precio_adicional = ''
  precio = ''
  clave: string = '';


  constructor(
    public dialogRef: MatDialogRef<DialogAddItemRepartoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemReparto | undefined,
  ) {

  }


  closeDialog() {
    this.dialogRef.close();
  }

  onAceptar() {
    //Verificamos si es valido el precio adicional
    if (this.precio_adicional && isNaN(Number(this.precio_adicional))) {
      this.alertError('El precio adicional debe ser un numero')
      return
    }

    //Verificamos si es valido el precio
    if (isNaN(Number(this.precio)) || Number(this.precio) < 1) {
      this.alertError('El precio debe ser valido')
      return
    }

    //Verificamos si la clave es valida
    if (this.clave.length < 4) {
      this.alertError('La clave no es valida')
      return
    }

    if(this.listItemPedido.length < 1){
      this.alertError('Debe agregar al menos un item')
      return
    }

    const pedido = {
      num_guia: this.num_guia,
      detalle: this.detalle,
      precio_adicional: this.precio_adicional,
      precio: this.precio,
      clave: this.clave,
      items: this.listItemPedido
    }
    


    console.log(pedido);

  }

  alertError(
    mensaje: string
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonColor: '#047CC4',
      confirmButtonText: 'Entendido'
    })
  }




  listItemPedido: any[] = []


  addItemPedido() {
    this.listItemPedido.push({
      cant: 1,
      id_tipo_paquete: 0
    })
  }

  deleteItemPedido() {
    this.listItemPedido.pop()
  }

  disminuirCant(item: any) {
    if (item.cant > 1) {
      item.cant -= 1;
    }
  }

  aumentarCant(item: any) {
    item.cant += 1;
  }
}
