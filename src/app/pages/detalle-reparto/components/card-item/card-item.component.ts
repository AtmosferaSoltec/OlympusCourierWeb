import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemReparto } from '../../../../interfaces/item-reparto';
import { MatIconModule } from '@angular/material/icon';
import { ShowTipoPaquetePipe } from "../../../../pipes/show-tipo-paquete.pipe";
import { PaqueteService } from '../../../../services/paquete.service';

@Component({
  selector: 'app-card-item',
  standalone: true,
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
  imports: [CommonModule, MatIconModule, ShowTipoPaquetePipe]
})
export class CardItemComponent {

  @Input() item: ItemReparto | undefined;
  @Input() index: number = 0;

  listTipoPaquetes = inject(PaqueteService).listTipoPaquetes;
}
