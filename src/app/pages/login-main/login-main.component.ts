import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-main.component.html',
})
export class LoginMainComponent {
  router = inject(Router);
  usuarioService = inject(UsuarioService);
  loading = signal(false);

  formulario = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(8)]),
    clave: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  ngOnInit(): void {
    this.verificarLogin();
  }

  async verificarLogin() {
    try {
      const isLogged = await this.usuarioService.isLogged();
      if (isLogged) {
        this.router.navigate(['/menu', 'repartos']);
      }
    } catch {
      // Si falla la verificación el usuario permanece en el login
    }
  }

  onSubmit() {
    if (!this.formulario.valid) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Todos los campos son obligatorios.',
        icon: 'error',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#047CC4',
      });
      return;
    }

    const { user, clave } = this.formulario.controls;
    this.loading.set(true);

    this.usuarioService.login(user.value!, clave.value!).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          localStorage.setItem('token', res.data.token);
          this.router.navigate(['/menu', 'repartos']);
        } else {
          this.loading.set(false);
          Swal.fire({
            title: 'Error',
            text: res?.mensaje || 'Error al iniciar sesión',
            icon: 'error',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#047CC4',
          });
        }
      },
      error: () => {
        this.loading.set(false);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo conectar con el servidor. Intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#047CC4',
        });
      },
    });
  }
}
