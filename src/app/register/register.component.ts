import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { collection, doc, setDoc, Firestore } from '@angular/fire/firestore';
import { LetterDirective } from '../validadores/letras.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LetterDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  nombre: string = '';
  password: string = '';
  repetirPassword: string = '';
  // username: string = '';
  email: string = '';
  selectedRole: string = '';
  formRegister: FormGroup;

  constructor(private router: Router, private readonly fb: FormBuilder,private auth: AuthService, private firestore: Firestore) 
  {
    this.formRegister = this.fb.group({
      nombre: ['', [Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(2), Validators.maxLength(10)]],
      // username: ['', [Validators.required]],
      email: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),Validators.minLength(2), Validators.maxLength(30)]],
      password: ['', [Validators.min(5)]],
      repetirPassword: ['',[Validators.min(5)]],
      selectedRole: ['', [Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  async onSubmit() {
    
    if (this.formRegister.invalid) {
      return;
    }

    const passwordControl = this.formRegister.get('password');
    const repetirPasswordControl = this.formRegister.get('repetirPassword');
    const selectedRole = this.formRegister.get('selectedRole')?.value;
    const { email, password, repetirPassword } = this.formRegister.value;
  
    if (password !== repetirPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la contraseña',
        text: 'Las contraseñas no coinciden. Por favor, verifica.',
      }).then(() => {
        if (passwordControl && repetirPassword) {
          passwordControl.reset();
          repetirPassword.reset();
        }
      });
      return;
    }

    if (!selectedRole) {
      Swal.fire({
        icon: 'error',
        title: 'Perfil no seleccionado',
        text: 'Por favor, selecciona un perfil antes de registrarte.',
      });
      return;
    }
   
    try {
      const userExists = await this.auth.checkIfUserExists(email);
  
      if (userExists) {
                Swal.fire({
                  icon: 'error',
                  title: 'Usuario existente',
                  text: 'El correo electrónico ya está registrado. Inicia sesión en lugar de registrarte.',
                }).then(() => {
                  if (passwordControl && repetirPasswordControl) {
                    passwordControl.reset();
                    repetirPasswordControl.reset();
                  }
                });
      } else {
 
        const userCredential = await this.auth.register(email, password, selectedRole);
        const user = userCredential.user;
        const userDocRef = doc(collection(this.firestore, 'users&role'), user.uid);
        await setDoc(userDocRef, { mail: email, role: selectedRole }, { merge: true });
        await this.auth.login({email, password})
    
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Bienvenido!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/home']);
        });
      }
    } catch (error: any) {

      if (error.code === 'auth/invalid-email') {
        Swal.fire({
          icon: 'error',
          title: 'Error en el correo electrónico',
          text: 'El formato del correo electrónico es incorrecto. Por favor, verifica.',
        });
      } else if (error.code === 'auth/weak-password') {
        Swal.fire({
          icon: 'error',
          title: 'Contraseña débil',
          text: 'La contraseña es demasiado débil. Debe contener al menos 6 caracteres.',
        }).then(() => {
          if (passwordControl && repetirPasswordControl) {
            passwordControl.reset();
            repetirPasswordControl.reset();
          }
        });
      }else if (error.code === 'auth/email-already-in-use') {

        Swal.fire({
          icon: 'error',
          title: 'Correo electrónico en uso',
          text: 'El correo electrónico ya está registrado. Inicia sesión en lugar de registrarte.',
        }); 
      } else {
        console.error('Error en el registro:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Hubo un error al registrar tu cuenta. Por favor, verifica tus datos.',
        }).then(() => {
          if (passwordControl && repetirPasswordControl) {
            passwordControl.reset();
            repetirPasswordControl.reset();
          }
        });
      }
    }
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
