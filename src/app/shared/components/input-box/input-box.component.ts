import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.css'
})
export class InputBoxComponent {

  @Input() label!: string;
  @Input() width : string = '450';
  @Input() formName !: FormControl;

  miEstilo = {
    'width': `${this.width}.px`
  }
}
