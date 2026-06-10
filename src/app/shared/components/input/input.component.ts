import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';

let nextId = 0;

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() hint = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' | 'date' | 'tel' = 'text';
  @Input() placeholder = '';
  @Input() maxlength: number | null = null;
  @Input() multiline = false;
  @Input() rows = 3;
  @Input() inputClass = '';

  /** Mensaje de error manual (para validación que no usa Reactive Forms) */
  @Input() error: string | null = null;
  /** Mapa de claves de validador (required, minlength, etc) a mensajes legibles */
  @Input() errorMessages: Record<string, string> = {};

  id = `app-input-${nextId++}`;
  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  get errorMessage(): string | null {
    if (this.error) {
      return this.error;
    }

    const control = this.ngControl?.control;
    if (control && control.invalid && (control.touched || control.dirty)) {
      const errorKey = Object.keys(control.errors ?? {})[0];
      return this.errorMessages[errorKey] ?? null;
    }

    return null;
  }
}
