import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-elemento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-elemento.component.html',
  styleUrl: './crear-elemento.component.css'
})
export class CrearElementoComponent implements OnInit{

  @Output() elementoCreado: EventEmitter<any> = new EventEmitter();

  nombre: any;
  tipo: any;
  peso: any;
  precio: any;
  correcto: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  reset() {
    this.nombre = '';
    this.tipo = '';
    this.peso = '';
    this.precio = '';
  }

  crearElemento() {
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
