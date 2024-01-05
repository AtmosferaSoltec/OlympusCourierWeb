import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from '../../app.service';
import { UsuarioService } from '../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { DialogCambiarPassComponent } from '../dialog-cambiar-pass/dialog-cambiar-pass.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule, MatTooltipModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {



  router = inject(Router)
  dialog = inject(MatDialog)
  usuarioService = inject(UsuarioService)
  appService = inject(AppService)
  navData = [
    {
      routerLink: 'repartos',
      icon: 'local_shipping',
      label: 'Repartos'
    },
    {
      routerLink: 'clientes',
      icon: 'group',
      label: 'Clientes'
    },
    {
      routerLink: 'comprobantes',
      icon: 'description',
      label: 'Comprobantes'
    },
    {
      routerLink: 'pagos',
      icon: 'payments',
      label: 'Pagos'
    }
  ]

  ngOnInit(): void {
    this.usuarioService.validarSesion();
  }

  navegar(url: string) {
    this.router.navigateByUrl(`/menu/${url}`)
  }

  toggle() {
    this.appService.isCollapsed = !this.appService.isCollapsed
  }

  closeSidenav() {
    this.appService.isCollapsed = false;
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
    const apePaterno = this.usuarioService.usuario()?.apellidos || '';
    const primeraLetraApellido = apePaterno.length > 0 ? apePaterno.charAt(0) + '.' : '';
    return `${nombres} ${primeraLetraApellido}`;
  }
}
