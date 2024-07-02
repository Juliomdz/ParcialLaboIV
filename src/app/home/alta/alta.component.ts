import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Firestore, Timestamp, addDoc, collection } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ListadoPaisesComponent } from '../../listado-paises/listado-paises.component';
import { NumberDirective } from '../../validadores/numero.directive';
import { LetterDirective } from '../../validadores/letras.directive';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../guards/can-component-deactivate.interface';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-alta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ListadoPaisesComponent, NumberDirective, LetterDirective],
  templateUrl: './alta.component.html',
  styleUrl: './alta.component.css'
})
export class AltaComponent implements OnInit, CanComponentDeactivate{

  listaPaises: any[] = [];
  formAlta : FormGroup;
  continente: string = '';
  banderaSeleccionada: string | null = null;
  nombrePais: string = '';
  formEnviado: boolean = false;
  btnVolver = 'Volver a Home';
  hasUnsavedChanges: boolean = false;
  isDropdownOpen = false;
  screenWidth = 0;
  currentUser$: Observable<User | null>;


  constructor(private apiService: ApiService, private firestore: Firestore, private readonly fb: FormBuilder, private router: Router, private auth: AuthService){
    this.formAlta = this.fb.group({
      dni: ['', [Validators.pattern("^[0-9]+"), Validators.minLength(7), Validators.maxLength(8)]],
      nombre: ['', [Validators.pattern('^[a-zA-Z]+$'),Validators.minLength(2), Validators.maxLength(20)]],
      edad: ['', [Validators.pattern("^[0-9]+"),Validators.min(18), Validators.max(99)]],
      capacidadTransporte: ['',[Validators.pattern("^[0-9]+"), Validators.min(1), Validators.max(500)]],
      unidadPropia: [false, Validators.required],
      continente: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      paisOrigen: ['', [Validators.minLength(3), Validators.maxLength(99)]]
    });

    this.currentUser$ = this.auth.getCurrentUser();

    this.formAlta.valueChanges.subscribe(() => {
      this.hasUnsavedChanges = this.formAlta.dirty;
    });
  }

  ngOnInit(): void {

    this.screenWidth = window.innerWidth;

    document.addEventListener('click', this.onDocumentClick.bind(this));
    
    this.apiService.pais$.subscribe((pais) => {
      
      if (pais) {
       
        this.nombrePais = pais.nombre;
                
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.hasUnsavedChanges) {
      return this.showConfirmationDialog();
    }
    return true;
  }

  private showConfirmationDialog(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      Swal.fire({
        title: 'Tienes cambios sin guardar',
        text: '¿Estás seguro de que quieres salir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

  }

  onDocumentClick(event: MouseEvent) {
    if (!(<HTMLElement>event.target).closest('.navbar-custom')) {
      this.isDropdownOpen = false;
    }
  }
  

  getValue(value: string): AbstractControl{
    return this.formAlta.get(value) as FormGroup;
  }

  getCountries(pais: any) 
  {
    this.nombrePais = pais;

  }

  public onClick(event: any): void 
  {
    this.router.navigate(['/home']);
  }

  updatePaises() {
    const selectedContinente = this.formAlta.get('continente');
  
    if (selectedContinente && selectedContinente.value) {
      
      const region = selectedContinente.value;
      
      this.apiService.obtenerPaises(region).subscribe((data: any) => {
        
        this.listaPaises = data;
        
        this.banderaSeleccionada = null;
      });
    }
  }

  onSubmit() {

    this.formEnviado = true;

   if (this.formAlta.valid) 
   {
     this.guardarDatos(this.formAlta.value);
     this.formAlta.reset();
     this.hasUnsavedChanges = false;
   } else {
     Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Por favor, completa todos los campos antes de guardar.',
     });
   }
 }

 guardarDatos(usuarioData: any) {
        
  if (usuarioData.unidadPropia === null) {
    usuarioData.unidadPropia = 'No';
  } else {
    usuarioData.unidadPropia = usuarioData.unidadPropia ? 'Sí' : 'No';
  }

  const firebaseCollection = 'Alta';
  const collectionRef = collection(this.firestore, firebaseCollection);

  addDoc(collectionRef, {
    ...usuarioData,
    fechaCreacion: Timestamp.now()
  })
    .then(() => {
      console.log('Datos guardados en Firestore');
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        text: '¡Los datos han sido guardados con éxito!',
        confirmButtonText: 'OK'
      });
      this.limpiarListaPaises();
    })
    .catch((error: any) => {
      console.error('Error al guardar en Firestore: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al guardar los datos en Firebase.'
      });
    });
}

limpiarListaPaises() {
  this.listaPaises = [];
  this.banderaSeleccionada = null;
  this.nombrePais = '';
}


logout() {
  Swal.fire({
    title: '¿Quieres cerrar sesión?',
    text: 'Lamentamos que quieras salir...',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.auth.logout();
      this.router.navigate(['login']);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.router.navigate(['home']);
      Swal.fire('Que bueno, volviste!', 'Tu sesión sigue abierta :)', 'info');
    }
  });
}

}
