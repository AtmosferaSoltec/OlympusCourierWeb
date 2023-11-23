import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, DrawerComponent, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  collapsed: boolean = false;


  router = inject(Router);

  menu(url: string) {
    this.router.navigateByUrl('/menu/' + url)
  }

  onCollapsedChange(collapsed: boolean) {
    this.collapsed = collapsed;
  }
}
