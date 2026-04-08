import { Component, OnInit, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
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
