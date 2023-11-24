import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {
  router = inject(Router)

  @Input() conected = false;
  @Output() onToggleSideNav: EventEmitter<boolean> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;

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

  selected = 'repartos'

  navegar(url: string) {
    this.router.navigate(['/menu', url]);
    this.selected = url;
  }
}
