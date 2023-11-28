import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {

  @Input() conected = false;
  @Output() onToggleSideNav: EventEmitter<boolean> = new EventEmitter();

  router = inject(Router)
  usuarioService = inject(UsuarioService);

  collapsed = false;
  screenWidth = 0;
  selected = 'repartos'

  idUser = localStorage.getItem('idUser');

  constructor() {
    if (this.idUser) {
      this.usuarioService.get(this.idUser).subscribe({
        next: (data: any) => {
          if (data && data.isSuccess) {
            this.usuarioService.usuario = data.data;
          }
        }
      })
    }
  }

  toggleNavigation() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit(!this.collapsed);
  }

  close() {
    this.collapsed = false;
    this.onToggleSideNav.emit(true);
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('idUser');
  }


  navegar(url: string) {
    this.router.navigate(['/menu', url]);
    this.selected = url;
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
