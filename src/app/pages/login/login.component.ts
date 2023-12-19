import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router)

  formulario: FormGroup;
  usuarioService = inject(UsuarioService);

  constructor(
    private fb: FormBuilder
  ) {

    if (this.usuarioService.isLogged()) {
      this.router.navigate(['/menu', 'repartos'])
    }

    this.formulario = this.fb.group({
      user: ['', [Validators.minLength(8)]],
      clave: ['', [Validators.minLength(4)]]
    })
  }

  loading = signal(false);

  onSubmit() {
    this.loading.set(true);
    if (this.formulario.valid) {
      this.usuarioService.login(this.formulario.get('user')?.value, this.formulario.get('clave')?.value).subscribe({
        next: ((res: any) => {
          if (res?.isSuccess) {
            localStorage.setItem('idUser', res.data.id)
            localStorage.setItem('ruc', res.data.ruc)
            this.router.navigate(['/menu', 'repartos'])
          } else {
            Swal.fire({
              title: "Error!",
              text: res?.mensaje || 'Error al iniciar sesión',
              icon: "error",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#047CC4",
            })
          }
        }),
        error: (err) => {
          this.loading.set(false);
          console.log(err);
        },
      })
    } else {
      Swal.fire({
        title: "Error!",
        text: "Todos los campos son obligatorios.",
        icon: "error",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#047CC4",
      })
      this.loading.set(false);
    }
  }
}
