import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-repartos',
  standalone: true,
  imports: [
    CommonModule,
    FiltrosComponent,
    TablaComponent,
    MatIconModule
  ],
  templateUrl: './repartos.component.html',
  styleUrl: './repartos.component.css'
})
export class RepartosComponent {

}
