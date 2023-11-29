import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DialogAddItemRepartoComponent } from '../../../../components/dialog-add-item-reparto/dialog-add-item-reparto.component';
import { ItemReparto } from '../../../../models/item-reparto';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgregarRepartoService } from '../../agregar-reparto.service';

@Component({
  selector: 'app-tabla-items',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatButtonModule, MatTooltipModule],
  templateUrl: './tabla-items.component.html',
  styleUrl: './tabla-items.component.css'
})
export class TablaItemsComponent {
  columnas: string[] = [
    'guia',
    'tipo',
    'descrip',
    'cant',
    'precio',
    'act',
  ];

  @ViewChild(MatTable) table!: MatTable<ItemReparto>;

  service = inject(AgregarRepartoService);

  /** Añadir Item Reparto*/
  openDialogAddItemReparto() {
    const dialogRef = this.dialog.open(DialogAddItemRepartoComponent, {
      width: "770px"
    });

    dialogRef.afterClosed().subscribe((data: ItemReparto) => {
      if (data) {
        this.service.listItemRepartos.push(data)
        this.table.renderRows();
      }
    });
  }

  dialog = inject(MatDialog)


  editItemReparto(item: ItemReparto) {
    const dialogRef = this.dialog.open(DialogAddItemRepartoComponent, {
      data: item,
      width: "770px"
    })

    dialogRef.afterClosed().subscribe((data: ItemReparto) => {
      if (data) {
        const index = this.service.listItemRepartos.findIndex((element) => element === item);
        if (index !== -1) {
          this.service.listItemRepartos[index] = data;
          this.table.renderRows();
        }
      }
    });
  }

  deleteItemReparto(item: ItemReparto) {
    const index = this.service.listItemRepartos.indexOf(item);
    if (index !== -1) {
      this.service.listItemRepartos.splice(index, 1);
      this.table.renderRows();
    }
  }
}
