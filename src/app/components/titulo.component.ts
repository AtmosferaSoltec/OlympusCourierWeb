import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  imports: [],
  template: `
    <p class="text-xl sm:text-2xl lg:text-3xl text-p1 font-semibold p-0 m-0">{{ titulo }}</p>
  `,
  styles: `
    p {
      margin: 0;
      padding: 0;
    }
  `,
})
export class TituloComponent {
  @Input() titulo?: string;
}
