import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { BodyComponent } from '../../drawer/body/body.component';
import { SidenavComponent } from '../../drawer/sidenav/sidenav.component';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  SidenavComponent, BodyComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  collapsed: boolean = false;


  router = inject(Router);
  appService = inject(AppService)

  menu(url: string) {
    this.router.navigateByUrl('/menu/' + url)
  }

  onCollapsedChange(collapsed: boolean) {
    this.collapsed = collapsed;
  }
}
