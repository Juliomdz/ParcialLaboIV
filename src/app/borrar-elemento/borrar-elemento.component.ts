import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-borrar-elemento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './borrar-elemento.component.html',
  styleUrl: './borrar-elemento.component.css'
})
export class BorrarElementoComponent implements OnInit{

  @Output() elementoCreado: EventEmitter<any> = new EventEmitter();
  @Input() elemento: any;

  nombre: any = '';
  tipo: any;
  peso: any;
  precio: any;
  correcto: boolean = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  reset() {

    this.elemento = null;
  }

  borrarElemento() 
  {
    if (this.tipo != null && this.peso != null && this.precio != null) {
      let elementoNuevo = { nombre: this.elemento.nombre, tipo: this.tipo, peso: this.peso, precio: this.precio };
      this.elementoCreado.emit(elementoNuevo);
      this.reset();
    } else {
      this.correcto = false;
    }
  }

}
