import { Component, Input, inject } from '@angular/core';

import { ItemReparto } from '../../../../interfaces/item-reparto';
import { MatIconModule } from '@angular/material/icon';
import { PaqueteService } from '../../../../services/paquete.service';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrl: './card-item.component.scss',
    imports: [MatIconModule]
})
export class CardItemComponent {

  @Input() item: ItemReparto | undefined;
  @Input() index: number = 0;

  listTipoPaquetes = inject(PaqueteService).listTipoPaquetes;
}
