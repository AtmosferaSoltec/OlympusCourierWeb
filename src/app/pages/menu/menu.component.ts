import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../drawer/sidenav/sidenav.component';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidenavComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {


  router = inject(Router);
  appService = inject(AppService)

  menu(url: string) {
    this.router.navigateByUrl('/menu/' + url)
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.appService.isCollapsed) {
      styleClass = 'body-trimmed'
    } else {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}
