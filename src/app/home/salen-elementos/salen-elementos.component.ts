import { Component, OnInit, } from '@angular/core';
import { ListadoElementosComponent } from '../../listado-elementos/listado-elementos.component';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { CrearElementoComponent } from '../../crear-elemento/crear-elemento.component';
import { ModificarElementoComponent } from '../../modificar-elemento/modificar-elemento.component';
import { BorrarElementoComponent } from '../../borrar-elemento/borrar-elemento.component';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-salen-elementos',
  standalone: true,
  imports: [CommonModule,ListadoElementosComponent,CrearElementoComponent, ModificarElementoComponent, BorrarElementoComponent],
  templateUrl: './salen-elementos.component.html',
  styleUrl: './salen-elementos.component.css'
})
export class SalenElementosComponent implements OnInit{

  listaElementos: any;
  crear: boolean = true;
  modificar: boolean = false;
  eliminar: boolean = false;
  borrar: boolean = false;
  elementoAModificar: any;
  elementoAEliminar: any;
  btnVolver = 'Volver a Home';
  currentUser$: Observable<User | null>;
  isDropdownOpen = false;
  screenWidth = 0;

  constructor(private router: Router,private dataService : DatabaseService, private auth: AuthService) { 

    this.currentUser$ = this.auth.getCurrentUser();
  }

  ngOnInit(): void {

    this.traerListaActualizada();

  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

  }

  onDocumentClick(event: MouseEvent) {
    if (!(<HTMLElement>event.target).closest('.navbar-custom')) {
      this.isDropdownOpen = false;
    }
  }

  public onClick(event: any): void 
  {
    this.router.navigate(['/home']);
  }

  async traerListaActualizada() {
    this.listaElementos = await this.dataService.obtenerInfo('elementos');
  }

  async crearElemento(elemento: any) {
    this.dataService.agregar('elementos', elemento);
    this.traerListaActualizada();
  }

  async crearElemVisual()
  {
    this.crear = true;
    this.eliminar = false;
    this.modificar = false;
  }

  async modificarElemento(elemento: any) {
    this.modificar = true;
    this.elementoAModificar = elemento;
    this.eliminar = false;
    this.crear = false;
    
  }
  
  async borrarElemento(elemento: any) {
    this.eliminar = true;
    this.modificar = false;
    this.crear = false;
    this.elementoAEliminar = elemento;
    this.traerListaActualizada();

  }

  recibirElementoModificado(elementoNuevo: any) {

    this.dataService.actualizar(elementoNuevo);
    this.traerListaActualizada();
    this.modificar = false;
    this.crear = true;

  }

  recibirElementoAEliminar(elementoNuevo: any) 
  {
    this.dataService.eliminar(elementoNuevo);
    this.traerListaActualizada();
    this.eliminar = false;
    this.crear = true;

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
