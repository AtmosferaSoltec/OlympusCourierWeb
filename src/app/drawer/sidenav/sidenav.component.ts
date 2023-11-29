import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SideNavToggle } from './sidenav-toggle';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  navData = [
    {
      routerLink: 'dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard'
    },
    {
      routerLink: 'products',
      icon: 'fal fa-box-open',
      label: 'Productos'
    },
    {
      routerLink: 'statistics',
      icon: 'fal fa-chart-bar',
      label: 'Estasticias'
    },

  ]

  router = inject(Router)

  appService = inject(AppService)


  navegar(url: string) {
    this.router.navigateByUrl(url)
  }

  toggle() {
    this.appService.isCollapsed = !this.appService.isCollapsed
  }

  closeSidenav() {
    this.appService.isCollapsed = false;
  }
}
