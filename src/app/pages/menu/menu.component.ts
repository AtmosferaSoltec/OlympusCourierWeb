import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidenavComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {


  appService = inject(AppService)

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
