import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  currentUser$: Observable<User | null>;
  isDropdownOpen = false;
  screenWidth = 0;

  constructor(private router: Router, private auth: AuthService) 
  {
    this.currentUser$ = this.auth.getCurrentUser();

   }

   ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    document.addEventListener('click', this.onDocumentClick.bind(this));
  }


  altaElemento()
  {
    this.router.navigate(['home/alta']);
  }

  detalleElemento()
  {
    this.router.navigate(['home/lista']);
  }

  altaElemento2()
  {
    this.router.navigate(['home/salen']);
  }

  altaElemento3()
  {
    this.router.navigate(['busqueda']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

  }

  onDocumentClick(event: MouseEvent) {
    if (!(<HTMLElement>event.target).closest('.navbar-custom')) {
      this.isDropdownOpen = false;
    }
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
