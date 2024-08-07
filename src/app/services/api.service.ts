import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { MovieResponse, Movie } from '../home/elemento.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  private urlApi = 'https://restcountries.com/v3.1/region/';
  private gitImage = 'https://api.github.com/users/Juliomdz';
  paises: any = [];
  private datosGitSubject = new BehaviorSubject<any>(null);
  paisSubject = new BehaviorSubject<any>(null);

  pais$: Observable<any> = this.paisSubject.asObservable();
  datosGit$: Observable<any> = this.datosGitSubject.asObservable();

  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerPaises();
  }

  // obtenerPaises() 
  // {
  //   return this.http.get(this.urlApi);
  // }

  obtenerPaises(region: string = ''): Observable<any[]> {
    
    const apiUrl = this.urlApi + region;

    return this.http.get(apiUrl).pipe(
      
      map((response: any) => {

        if (Array.isArray(response)) {
          const paisesMapeados = response.slice(0,3).map((auxPais: any) => {
            const pais = {
              nombre: auxPais.name.common,
              region: auxPais.region,
              bandera: auxPais.flags.svg,
            };

            return pais;
          });
          console.log(paisesMapeados);
          return paisesMapeados;
          
        } else {
          console.error('La respuesta no es un array:', response);
          return [];
        }
      })
    );
  }

  obtenerListadoParametro(url: any) {
    return this.http.get(url);
  }

  obtenerImagen() {
    this.http.get(this.gitImage).subscribe(
      (datos: any) => {
        if (typeof datos === 'object' && datos.login) {
          const datosGit = [{
            nombre: datos.name,
            image: datos.avatar_url,
            ubicacion: datos.location,
          }];
          this.datosGitSubject.next(datosGit);
        } else {
          console.error('La respuesta de la API no contiene los datos esperados.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de la API:', error);
      }
    );
  }

  
}
 
