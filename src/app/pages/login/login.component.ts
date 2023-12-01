import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { UsuarioService } from '../../services/usuario.service';
import { DistritoService } from '../../services/distrito.service';

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
  distritoService = inject(DistritoService);

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

  onSubmit() {
    if (this.formulario.valid) {
      this.usuarioService.login(this.formulario.get('user')?.value, this.formulario.get('clave')?.value).subscribe({
        next: ((data:any)=>{
          if(data?.isSuccess){
            localStorage.setItem('idUser', data.data)
            this.router.navigate(['/menu', 'repartos'])
          }else{
            console.log(data);
            
            console.log('Credenciales incorrectas');
          }
        }),
        error(err) {
          console.log(err);
        },
      })
    }
  }
}
