import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DialogAddItemRepartoComponent } from './dialog-add-item-reparto.component';
import { ItemReparto } from '../../../interfaces/item-reparto';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgregarRepartoService } from '../agregar-reparto.service';

@Component({
  selector: 'app-tabla-items',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <div
      class="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden my-4"
    >
      <!-- Estado vacío -->
      @if (service.listItemRepartos().length === 0) {
        <div
          class="flex flex-col items-center justify-center gap-2 py-10 text-textos/50"
        >
          <svg
            class="w-10 h-10 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span class="text-sm font-medium">Sin items agregados</span>
          <span class="text-xs">Usa el botón "Agregar Item" para comenzar</span>
        </div>
      } @else {
        <!-- Tabla con scroll horizontal en mobile -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <!-- Cabecera -->
            <thead>
              <tr
                class="bg-p-50 border-b border-p-100 text-p-700 text-xs uppercase tracking-wide"
              >
                <th class="px-4 py-3 text-left font-semibold">N° Guía</th>
                <th class="px-4 py-3 text-left font-semibold">Detalle</th>
                <th class="px-4 py-3 text-left font-semibold">Clave</th>
                <th class="px-4 py-3 text-right font-semibold">Adicional</th>
                <th class="px-4 py-3 text-right font-semibold">Precio</th>
                <th class="px-4 py-3 text-center font-semibold">Acciones</th>
              </tr>
            </thead>

            <!-- Filas -->
            <tbody class="divide-y divide-gray-50">
              @for (item of service.listItemRepartos(); track $index) {
                <tr
                  class="hover:bg-gray-50/70 transition-colors duration-100 group"
                >
                  <td class="px-4 py-2.5 font-medium text-t">
                    {{ item.num_guia }}
                  </td>
                  <td
                    class="px-4 py-2.5 text-textos max-w-[180px] truncate"
                    [title]="item.detalle"
                  >
                    {{ item.detalle }}
                  </td>
                  <td class="px-4 py-2.5 text-textos">{{ item.clave }}</td>
                  <td class="px-4 py-2.5 text-right font-medium text-t">
                    S/{{ item.adicional | number: '1.2-2' }}
                  </td>
                  <td class="px-4 py-2.5 text-right font-semibold text-p-700">
                    S/{{ item.precio | number: '1.2-2' }}
                  </td>
                  <td class="px-4 py-2.5">
                    <div class="flex items-center justify-center gap-1">
                      <button
                        (click)="editItemReparto(item)"
                        matTooltip="Editar"
                        class="p-1.5 rounded-lg text-gray-400 hover:text-p-600 hover:bg-p-50 transition-all duration-150"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.415.586H9v-2a2 2 0 01.586-1.414z"
                          />
                        </svg>
                      </button>
                      <button
                        (click)="deleteItemReparto(item)"
                        matTooltip="Eliminar"
                        class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class TablaItemsComponent {
  service = inject(AgregarRepartoService);
  dialog = inject(MatDialog);

  editItemReparto(item: ItemReparto) {
    const dialogRef = this.dialog.open(DialogAddItemRepartoComponent, {
      data: item,
      width: '770px',
    });
    dialogRef.afterClosed().subscribe((data: ItemReparto) => {
      if (data) {
        const index = this.service
          .listItemRepartos()
          .findIndex((element) => element === item);
        if (index !== -1) {
          this.service.listItemRepartos()[index] = data;
        }
      }
    });
  }

  deleteItemReparto(item: ItemReparto) {
    const index = this.service.listItemRepartos().indexOf(item);
    if (index !== -1) {
      this.service.listItemRepartos().splice(index, 1);
    }
  }
}
