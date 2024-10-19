import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  switchMap,
} from 'rxjs';
import { ClienteService } from '../../../../services/cliente.service';
import { AgregarRepartoService } from '../../agregar-reparto.service';

@Component({
  selector: 'app-buscar-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buscar-cliente.component.html',
})
export class BuscarClienteComponent {

  service = inject(AgregarRepartoService);
  searchTerm = new Subject<string>();
  clienteService = inject(ClienteService);
  list = signal<any[]>([]);

  constructor() {
    this.searchTerm
      .pipe(
        debounceTime(300), // Espera 300ms después de que el usuario deja de escribir
        distinctUntilChanged(),
        filter((term) => {
          return term.trim().length > 0;
        }),
        switchMap((term) => {
          if (term.trim() === '') {
            return [];
          }
          return this.clienteService.search(term); // Realiza la consulta
        }) // Realiza la consulta al backend
      )
      .subscribe({
        next: (data: any) => {
          this.list.set(data);
        },
      });
  }

  onSearch(event: any) {
    const term = event.target.value;
    if (term.trim() === '') {
      this.list.set([]);
    }
    this.searchTerm.next(term);
  }

  onSelect(id: number) {
    this.clienteService.get(id).subscribe({
      next: (data: any) => {
        this.list.set([]);
        this.service.client.set(data);
      }
    })
  }
}
