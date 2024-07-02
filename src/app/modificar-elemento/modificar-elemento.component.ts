import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-elemento',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './modificar-elemento.component.html',
  styleUrl: './modificar-elemento.component.css'
})
export class ModificarElementoComponent implements OnInit{

  @Output() elementoCreado: EventEmitter<any> = new EventEmitter();
  @Input() elemento: any;

  nombre: any = '';
  tipo: any;
  peso: any;
  precio: any;
  correcto: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elemento']) {
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    if (this.elemento) {
      this.nombre = this.elemento.nombre;
      this.tipo = this.elemento.tipo;
      this.peso = this.elemento.peso;
      this.precio = this.elemento.precio;
    }
  }

  reset() 
  {
    this.elemento = null;
  }

  modificarElemento() {
    if (this.nombre && this.tipo && this.peso !== null && this.precio !== null) {
      if (this.nombre.length >= 4 && this.nombre.length <= 25 &&
          this.peso >= 250 && this.peso <= 1000 &&
          this.precio >= 100) {
        let elementoNuevo = { nombre: this.nombre, tipo: this.tipo, peso: this.peso, precio: this.precio };
        this.elementoCreado.emit(elementoNuevo);
        this.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, complete todos los campos correctamente.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
      });
      this.correcto = false;
      return;
    }
  }


}
