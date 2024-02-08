import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DestinosComponent } from './components/distritos/distritos.component';
import { ComprobantesAdminComponent } from './components/comprobantes-admin/comprobantes-admin.component';
import { PanelAdminService } from './panel-admin.service';


@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [
    CommonModule, MatIconModule,
    RouterOutlet, MatTabsModule,
    UsuariosComponent,
    DestinosComponent, ComprobantesAdminComponent,
    RouterOutlet
  ],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.scss'
})
export class PanelAdminComponent implements OnDestroy {


  url = 'usuarios'
  data = [
    {
      label: 'Usuarios',
      url: 'usuarios'
    },
    {
      label: 'Distritos',
      url: 'distritos'
    },
    {
      label: 'Metodo de Pago',
      url: 'metodo-pago'
    },
    {
      label: 'Vehiculos',
      url: 'vehiculos'
    },
    {
      label: 'Comprobantes',
      url: 'comprobantes-admin'
    }
  ]

  private router = inject(Router)
  private panelService = inject(PanelAdminService);
  ngOnDestroy(): void {
    this.panelService.reset()
  }

  navegar(url: string) {
    const d = ['menu', 'panel-admin', `${url}`]
    this.url = url;
    this.router.navigate(d)
  }
}
