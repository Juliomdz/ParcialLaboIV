import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-peliculas',
  templateUrl: './tabla-peliculas.component.html',
  styleUrls: ['./tabla-peliculas.component.css']
})
export class TablaPeliculasComponent {

  @Input() listadoPeliculas:any[] = [] //Listado que recibe ---- padre => hijo
  @Output() unaPelicula:EventEmitter<any> = new EventEmitter<any>() //Pelicula que mandare a mostrar sus datos ---- hijo => padre

  mostrarDetalle(pelicula:any)
  {
    this.unaPelicula.emit(pelicula)
  }

}
