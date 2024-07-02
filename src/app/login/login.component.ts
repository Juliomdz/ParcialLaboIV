import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { LetterDirective } from '../validadores/letras.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,LetterDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  formLogin: FormGroup;

  credenciales = { email: '', password: '' };


  constructor(private router: Router, private auth: AuthService,private fb: FormBuilder) {
    this.formLogin = this.fb.group({email: ['', [Validators.required, Validators.email]],
                                      password: ['', [Validators.required]],
                                    });
   }

  async login() {
    // console.log('credenciales ->', this.credenciales);
    try {
      await this.auth.login(this.formLogin.value);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['home']);
    } catch (error: any) {
      if (error.code !== 'auth/invalid-email') {
        console.error('Error al iniciar sesión', error);
      }
      let errorMessage = 'Credenciales incorrectas';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido';
      }
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: errorMessage,
        timer: 1500
      });
    }
  }

  
  loginLoadAdmin() {
    this.credenciales.email = 'admin@test.com';
    this.credenciales.password = '123456';
  }

  loginLoadEmpleado() {
    this.credenciales.email = 'empleado@test.com';
    this.credenciales.password = '123456';
  }
  
  
  register() {
    this.router.navigate(['register']);
  }

}
