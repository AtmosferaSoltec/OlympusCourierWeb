import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

let nextId = 0;

@Component({
  standalone: true,
  selector: 'app-select',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './select.component.html',
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() hint = '';
  @Input() items: any[] = [];
  @Input() bindLabel = 'label';
  @Input() bindValue = 'value';
  @Input() placeholder = '';
  @Input() clearable = false;
  @Input() searchable = false;
  @Input() notFoundText = 'Sin resultados';

  /** Mensaje de error manual (para validación que no usa Reactive Forms) */
  @Input() error: string | null = null;
  /** Mapa de claves de validador (required, etc) a mensajes legibles */
  @Input() errorMessages: Record<string, string> = {};

  id = `app-select-${nextId++}`;
  value: any = null;
  disabled = false;

  private onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
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
