import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { collection, doc, setDoc, Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { CanComponentDeactivate } from '../..//app/guards/can-component-deactivate';

@Component({
  selector: 'aceptarTerminos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './aceptarTerminos.component.html',
  styleUrls: ['./aceptarTerminos.component.css']
})
export class AceptarTerminos implements CanComponentDeactivate {
  formRegister: FormGroup;
  terminosAceptados: boolean = false;
  formSubmitted = false;

  constructor(private router: Router, private readonly fb: FormBuilder, private auth: AuthService, private firestore: Firestore) {
    this.formRegister = this.fb.group({
      email: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.minLength(2), Validators.maxLength(30)]],
      aceptoTerminos: [false, Validators.requiredTrue]
    });
  }

  async onSubmit() {
    if (this.formRegister.invalid) {
      return;
    }

    const { email, aceptoTerminos } = this.formRegister.value;

    if (email == '') {
      Swal.fire({
        icon: 'error',
        title: 'Ingrese su mail',
        text: 'Por favor, ingrese un mail valido para continuar.'
      });
      return;
    }

    if (!aceptoTerminos) {
      Swal.fire({
        icon: 'error',
        title: 'Términos no aceptados',
        text: 'Por favor, acepta los términos y condiciones para continuar.'
      });
      return;
    }


    try {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '¡Bienvenido!',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/home']);
      });

    } catch (error: any) {
      console.error('Error en el registro:', error);
      let errorMessage = 'Hubo un error al registrar tu cuenta. Por favor, verifica tus datos.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'El formato del correo electrónico es incorrecto. Por favor, verifica.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo electrónico ya está registrado. Inicia sesión en lugar de registrarte.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: errorMessage
      });
    }
  }

  canDeactivate(): boolean | Promise<boolean> {
    if (this.formSubmitted) {
      return true;
    }
    if (this.formRegister.dirty && !this.formRegister.valid) {
      return Swal.fire({
        title: '¿Estás seguro?',
        text: 'Tienes cambios sin guardar. ¿Realmente quieres salir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'No, quedarme'
      }).then((result) => {
        return result.isConfirmed;
      });
    }
    return true;
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }
}