import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemReparto } from '../../../../models/item-reparto';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {

  @Input() item: ItemReparto | undefined;
  @Input() index: number = 0;

}
