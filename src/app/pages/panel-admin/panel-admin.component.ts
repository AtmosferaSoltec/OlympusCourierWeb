import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css'
})
export class PanelAdminComponent {

  data = [
    {
      icon: 'person',
      label: 'Usuarios',
      color: 'blue',
      url: 'usuarios'
    },
    {
      icon: 'person',
      label: 'Destinos',
      color: 'green',
      url: 'destinos'
    },
    {
      icon: 'person',
      label: 'Paquetes',
      color: 'yeelow',
      url: 'paquetes'
    },
  ]

  private router = inject(Router)

  navegar(url: string) {
    this.router.navigate(['/panel-admin', url])
  }
}
