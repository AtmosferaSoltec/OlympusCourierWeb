import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  @Input() collapsed = false;

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed) {
      styleClass = 'body-trimmed'
    } else {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}
