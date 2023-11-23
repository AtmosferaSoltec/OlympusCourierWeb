import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router)

  formulario: FormGroup;
  clienteService = inject(ClienteService);

  constructor(
    private fb: FormBuilder
  ) {

    if (this.clienteService.isLogged()) {
      this.router.navigate(['/menu', 'repartos'])
    }

    this.formulario = this.fb.group({
      user: [''],
      clave: ['']
    })
  }

  onSubmit() {
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKb2VsIE1hbGRvbmFkbyIsImlhdCI6MTY5ODI3MjU4OSwiZXhwIjpudWxsLCJhdWQiOiIiLCJzdWIiOiIiLCJOb21icmUiOiJKb2VsIE1hbGRvbmFkbyIsIkNsYXZlIjoiUGVycml0b0NhbGllbnRlIiwiY29ycmVvIjoiam1hbGRvbmFkb0BnbWFpbC5jb20iLCJyb2wiOiJBZG1pbiJ9.HESojbMmEdqtvky5aR0j7Bi06s76qQ-NdGlcJps9kwg')
    this.router.navigate(['/menu', 'repartos'])
  }
}
