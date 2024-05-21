import { Component, EventEmitter, Output,OnInit } from '@angular/core';
import { CountriesApiService } from 'src/app/services/countries-api.service';

@Component({
  selector: 'app-tabla-pais',
  templateUrl: './tabla-pais.component.html',
  styleUrls: ['./tabla-pais.component.css']
})
export class TablaPaisComponent implements OnInit {
  
  @Output() unPais:EventEmitter<any> = new EventEmitter<any>()
  
  datos:any

  constructor(private apiPaises:CountriesApiService) {}

  ngOnInit() {
    this.TraerPaises()
  }

  TraerPaises()
  {
    this.datos = this.apiPaises.getCountries().subscribe((datos:any[]) => this.datos = datos)
  }

  SeleccionarPais(nombre:string) {
    this.unPais.emit(nombre);
  }
  
}
