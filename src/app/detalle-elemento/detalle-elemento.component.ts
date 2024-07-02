import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Movie} from '../home/elemento.interface';

@Component({
  selector: 'app-detalle-elemento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-elemento.component.html',
  styleUrl: './detalle-elemento.component.css'
})
export class DetalleElementoComponent implements OnInit{

  @Input() peliculas: Movie[] = [];
  @Input() peliculaSeleccionada: Movie | null = null;
  @Input() inputItemSeleccionado: any;
  
  constructor() { }

  ngOnInit(): void {
  }
}
