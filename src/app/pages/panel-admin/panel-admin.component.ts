import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PaquetesComponent } from './components/paquetes/paquetes.component';
import { DestinosComponent } from './components/destinos/destinos.component';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [
    CommonModule, MatIconModule,
    RouterOutlet, MatTabsModule,
    UsuariosComponent, PaquetesComponent,
    DestinosComponent
  ],
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
    this.router.navigate(['menu', 'panel-admin', url])
  }
}
