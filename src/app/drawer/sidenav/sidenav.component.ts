import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from '../../app.service';
import { UsuarioService } from '../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  navData = [
    {
      routerLink: 'repartos',
      icon: 'local_shipping',
      label: 'Repartos',
      activo: true
    },
    {
      routerLink: 'clientes',
      icon: 'group',
      label: 'Clientes',
      activo: true
    },
    {
      routerLink: 'comprobantes',
      icon: 'description',
      label: 'Comprobantes',
      activo: true
    },
    {
      routerLink: 'panel-admin',
      icon: 'admin_panel_settings',
      label: 'Panel Admin',
      activo: false
    }
  ]

  router = inject(Router)

  appService = inject(AppService)


  navegar(url: string) {
    this.router.navigate(['/menu', url])
  }

  toggle() {
    this.appService.isCollapsed = !this.appService.isCollapsed
  }

  closeSidenav() {
    this.appService.isCollapsed = false;
  }


  idUser = localStorage.getItem('idUser');

  usuarioService = inject(UsuarioService);


  constructor() {
    if (this.idUser) {
      this.usuarioService.get(this.idUser).subscribe({
        next: (data: any) => {
          if (data && data.isSuccess) {
            this.usuarioService.usuario = data.data;
            if (this.usuarioService.usuario?.cod_rol != 'U') {
              this.navData[3].activo = true
            }
          }
        }
      })
    }
  }

  logout(){
    localStorage.removeItem('idUser');
    this.router.navigate(['login']);
  }

  getRol() {
    const codRol = this.usuarioService.usuario?.cod_rol || '';
    switch (codRol.toUpperCase()) {
      case 'A':
        return 'Admin';
      case 'U':
        return 'Usuario';
      case 'S':
        return 'Super Admin';
      case 'D':
        return 'Delivery';
      default:
        return 'Sin Rol';
    }
  }

  getNombre() {
    const nombres = this.usuarioService.usuario?.nombres || '';
    const apePaterno = this.usuarioService.usuario?.ape_paterno || '';
    const primeraLetraApellido = apePaterno.length > 0 ? apePaterno.charAt(0) + '.' : '';
    return `${nombres} ${primeraLetraApellido}`;
  }
}
