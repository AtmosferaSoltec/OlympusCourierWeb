import { Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { AppService } from '../../app.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
    selector: 'app-menu',
    imports: [RouterOutlet, SidenavComponent, NavbarComponent],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
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
