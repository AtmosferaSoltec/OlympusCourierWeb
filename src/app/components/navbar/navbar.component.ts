import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../app.service';
import { UsuarioService } from '../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCambiarPassComponent } from '../dialog-cambiar-pass/dialog-cambiar-pass.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isOpen = signal(false);
  listMenu = [
    {
      link: 'repartos',
      icon: 'local_shipping',
      name: 'Repartos',
    },
    {
      link: 'clientes',
      icon: 'group',
      name: 'Clientes',
    },
    {
      link: 'comprobantes',
      icon: 'description',
      name: 'Comprobantes',
    },
    {
      link: 'pagos',
      icon: 'payments',
      name: 'Pagos',
    },
  ];
  ngOnInit(): void {
    this.usuarioService.validarSesion();
  }
  router = inject(Router);
  dialog = inject(MatDialog);
  usuarioService = inject(UsuarioService);
  appService = inject(AppService);

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  cambiarPass() {
    const dialogRef = this.dialog.open(DialogCambiarPassComponent, {
      width: '770px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  logout() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Cerrar sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#047CC4',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      }
    });
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
