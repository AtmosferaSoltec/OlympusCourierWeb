import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HealthService } from './services/health.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'OlympusCourierWeb';

  /*
  healthService = inject(HealthService);

  ngOnInit(): void {
    this.healthService.checkServerHealth().subscribe();
    initFlowbite();
  }
  */
}
