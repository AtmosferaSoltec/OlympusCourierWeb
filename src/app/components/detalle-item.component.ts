import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-item',
  imports: [],
  template: `
    <div class="flex flex-col items-start my-2 md:items-center md:flex-row">
      <span class="flex-1 text-lg font-bold text-colorP1">{{ title }}</span>
      <div
        class="w-full md:flex-[2] md:max-w-[400px] p-2 bg-colorCard rounded-lg flex justify-end"
      >
        <span class="font-medium text-colorGrey"> {{ descrip || '-' }}</span>
      </div>
    </div>
  `,
})
export class DetalleItemComponent {
  @Input() title: string | null = '';
  @Input() descrip: any = '';
}
