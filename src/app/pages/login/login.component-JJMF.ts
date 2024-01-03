import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  router = inject(Router)

  formulario = new FormGroup({
    user: new FormControl('', [Validators.minLength(8)]),
    clave: new FormControl('', [Validators.minLength(4)])
  })
  usuarioService = inject(UsuarioService);


  ngOnInit(): void {
    this.verificarLogin()
  }

  async verificarLogin() {
    const isLogged = await this.usuarioService.isLogged();
    if (isLogged) {
      this.router.navigate(['/menu', 'repartos'])
    }
  }

  loading = signal(false);

  onSubmit() {
    try {
      this.loading.set(true);
      const { user, clave } = this.formulario.controls;
      if (this.formulario.valid && user.value && clave.value) {
        this.usuarioService.login(user.value, clave.value)
          .pipe(delay(500))
          .subscribe({
            next: (res => {
              if (res?.isSuccess) {
                console.log(res.data);
                localStorage.setItem('token', res.data.token)
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
              console.log(err);
            },
            complete: () => {
              this.loading.set(false);
            }
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
    } catch (error: any) {
      alert(error.message)
      this.loading.set(false);
    }
  }
}
