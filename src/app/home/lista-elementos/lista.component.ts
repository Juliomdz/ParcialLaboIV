import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DetalleElementoComponent } from '../../detalle-elemento/detalle-elemento.component';
import { DetallePaisComponent } from '../../detalle-pais/detalle-pais.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';
import Swal from 'sweetalert2';

interface Elemento {
  nombre: string;
  dni: string;
  paisOrigen: string;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, DetalleElementoComponent, DetallePaisComponent],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit{

  elemento: Elemento | null = null;
  listaElementos: Elemento[];
  btnVolver = 'Volver a Home';
  currentUser$: Observable<User | null>;
  isDropdownOpen = false;
  screenWidth = 0;

  constructor(private firestore: Firestore, private router: Router,private auth: AuthService){
    this.listaElementos = []
    this.currentUser$ = this.auth.getCurrentUser();
  }

  ngOnInit()
  {
    const elementosCollection = collection(this.firestore, 'Alta');
    const elementosData = collectionData(elementosCollection) as Observable<Elemento[]>;
  
    elementosData.subscribe(datos => {
      this.listaElementos = datos;
    });

    this.screenWidth = window.innerWidth;

    document.addEventListener('click', this.onDocumentClick.bind(this));
  
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

  }

  onDocumentClick(event: MouseEvent) {
    if (!(<HTMLElement>event.target).closest('.navbar-custom')) {
      this.isDropdownOpen = false;
    }
  }

  async getElemento(delivery: Elemento) {
    this.elemento = null;
    await setTimeout(() => {
      this.elemento = delivery;
    }, 200);
  }

  public onClick(event: any): void 
  {
    this.router.navigate(['/home']);
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
