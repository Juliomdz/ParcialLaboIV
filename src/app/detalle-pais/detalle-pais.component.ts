import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.css'
})
export class DetallePaisComponent {

  @Input() inputItemSeleccionado: any;

  detallePais: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    //console.log(this.inputItemSeleccionado);
    this.apiService.obtenerListadoParametro('https://restcountries.com/v3.1/name/' + this.inputItemSeleccionado.paisOrigen).subscribe((pais: any) => {
      this.detallePais = pais[0];
    });
  }
}
