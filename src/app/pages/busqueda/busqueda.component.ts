import { Component } from '@angular/core';
import { Pelicula,ETipoPelicula } from 'src/app/clases/pelicula';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  listadoPeliculas:Pelicula[] = []
  unaPelicula:any

  constructor()
  {
    this.listadoPeliculas= [
      {id:1, nombre:'Joker', tipo:ETipoPelicula.Otros, fechaEstreno:new Date('2019-10-4'), cantidadPublico:120, foto:'./assets/imagenes/peliculas/Joker-2019.jpg'},
      {id:2, nombre:'Scream(2022)', tipo:ETipoPelicula.Terror, fechaEstreno:new Date('2022-1-14'), cantidadPublico:100, foto:'./assets/imagenes/peliculas/Scream-2022.jpeg'},
      {id:3, nombre:'The Batman', tipo:ETipoPelicula.Otros, fechaEstreno:new Date('2022-3-4'), cantidadPublico:150, foto:'./assets/imagenes/peliculas/The_Batman-2022.jpg'}
    ]
  }

  Detalle($event:any)
  {
    this.unaPelicula = $event
  }

}
