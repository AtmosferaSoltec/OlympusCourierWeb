import { Component, Inject, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemReparto } from '../../../interfaces/item-reparto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaqueteService } from '../../../services/paquete.service';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-dialog-add-item-reparto',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, InputComponent],
  template: `
    <div class="flex flex-col">
      <!-- Header -->
      <div
        class="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-gray-100"
      >
        <div
          class="w-9 h-9 rounded-xl bg-p-100 flex items-center justify-center flex-shrink-0"
        >
          <svg
            class="w-5 h-5 text-p-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-base font-bold text-t">
            {{ data ? 'Editar Item' : 'Agregar Item' }}
          </h2>
          <p class="text-xs text-textos/60">
            {{
              data
                ? 'Modifica los datos del item'
                : 'Completa los datos del nuevo item'
            }}
          </p>
        </div>
      </div>

      <!-- Formulario -->
      <div class="px-6 py-5">
        <div class="flex flex-col gap-4">
          <!-- N° de Guía -->
          <app-input
            label="N° de Guía"
            placeholder="Ingrese número de guía"
            [(ngModel)]="num_guia"
          ></app-input>

          <!-- Precio + Adicional -->
          <div class="grid grid-cols-2 gap-3">
            <app-input
              label="Precio (S/)"
              type="number"
              placeholder="0.00"
              [(ngModel)]="precio"
              [error]="errors.precio"
            ></app-input>
            <app-input
              label="Adicional (S/)"
              hint="(opcional)"
              type="number"
              placeholder="0.00"
              [(ngModel)]="adicional"
              [error]="errors.adicional"
            ></app-input>
          </div>

          <!-- Clave -->
          <app-input
            label="Clave"
            hint="(exactamente 4 caracteres)"
            placeholder="Ej: AB12"
            [maxlength]="4"
            inputClass="tracking-widest font-mono"
            [(ngModel)]="clave"
            [error]="errors.clave"
          ></app-input>

          <!-- Detalle -->
          <app-input
            label="Detalle"
            placeholder="Ingresa descripción del pedido"
            [multiline]="true"
            [rows]="5"
            [(ngModel)]="detalle"
            [error]="errors.detalle"
          ></app-input>
        </div>
      </div>

      <!-- Footer acciones -->
      <div class="flex items-center justify-end gap-2 px-6 py-4">
        <button
          (click)="closeDialog()"
          class="px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
        >
          Cancelar
        </button>
        <button
          (click)="onAceptar()"
          class="px-4 py-2 text-sm font-semibold text-white bg-p-600 hover:bg-p-700 rounded-xl transition-colors shadow-sm"
        >
          {{ data ? 'Actualizar' : 'Guardar' }}
        </button>
      </div>
    </div>
  `,
})
export class DialogAddItemRepartoComponent {
  paqueteService = inject(PaqueteService);

  num_guia = '';
  precio = '';
  adicional = '';
  clave = '';
  detalle = '';

  errors = {
    precio: '',
    adicional: '',
    clave: '',
    detalle: '',
  };

  constructor(
    public dialogRef: MatDialogRef<DialogAddItemRepartoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemReparto | undefined,
  ) {
    if (data) {
      console.log(data);
      this.num_guia = data.num_guia ?? '';
      this.precio = data.precio ? data.precio.toString() : '';
      this.adicional = data.adicional ? data.adicional.toString() : '';
      this.clave = data.clave ?? '';
      this.detalle = data.detalle ?? '';
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onAceptar() {
    this.errors = { precio: '', adicional: '', clave: '', detalle: '' };

    if (isNaN(Number(this.precio)) || Number(this.precio) < 1) {
      this.errors.precio = 'El precio debe ser un número mayor a 0';
    }

    //Validar si el adicional no esta vacio, si no esta validar si el valor es numero y mayor a 1
    if (
      this.adicional &&
      (isNaN(Number(this.adicional)) || Number(this.adicional) < 1)
    ) {
      this.errors.adicional = 'El adicional debe ser un número mayor a 0';
    }

    //Validar si el detalle no esta vacio
    if (!this.detalle) {
      this.errors.detalle = 'El detalle no puede estar vacio';
    }

    //Validar si la clave tiene 4 caracteres
    if (this.clave.length !== 4) {
      this.errors.clave = 'La clave debe tener 4 caracteres';
    }

    if (
      this.errors.precio ||
      this.errors.adicional ||
      this.errors.clave ||
      this.errors.detalle
    ) {
      return;
    }

    const itemReparto: ItemReparto = {
      num_guia: this.num_guia,
      precio: Number(this.precio),
      adicional: Number(this.adicional),
      clave: this.clave,
      detalle: this.detalle,
    };

    this.dialogRef.close(itemReparto);
  }
}
