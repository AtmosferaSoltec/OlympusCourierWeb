import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from '../../app.service';
import { UsuarioService } from '../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { DialogCambiarPassComponent } from '../../components/dialog-cambiar-pass/dialog-cambiar-pass.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule, MatTooltipModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  usuarioService = inject(UsuarioService)
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
      routerLink: 'panel-admin/usuarios',
      icon: 'admin_panel_settings',
      label: 'Panel Admin',
      activo: this.usuarioService.usuario()?.cod_rol === 'A' || this.usuarioService.usuario()?.cod_rol === 'S'
    }
  ]

  router = inject(Router)
  appService = inject(AppService)


  navegar(url: string) {
    this.router.navigateByUrl(`/menu/${url}`)
  }

  toggle() {
    this.appService.isCollapsed = !this.appService.isCollapsed
  }

  closeSidenav() {
    this.appService.isCollapsed = false;
  }

  dialog = inject(MatDialog)

  constructor() {
  }

  cambiarPass() {
    const dialogRef = this.dialog.open(DialogCambiarPassComponent, {
      width: "770px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }



  logout() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#047CC4',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      }
    })
  }

  getRol() {
    const codRol = this.usuarioService.usuario()?.cod_rol || '';
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
    const nombres = this.usuarioService.usuario()?.nombres || '';
    const apePaterno = this.usuarioService.usuario()?.ape_paterno || '';
    const primeraLetraApellido = apePaterno.length > 0 ? apePaterno.charAt(0) + '.' : '';
    return `${nombres} ${primeraLetraApellido}`;
  }
}
