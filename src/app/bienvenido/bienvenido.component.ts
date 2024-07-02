import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../services/api.service'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent implements OnInit{

  datosGit: any = [];
  btnIniciar = 'Iniciar sesión';
  btnRegistrar = 'Registrarse'

  perfil:any;
  urlApi:string = "https://api.github.com/users/Juliomdz";

  constructor(private http:HttpClient, private router: Router,private apiService: ApiService) {}

  ngOnInit(): void {
      this.http.get(this.urlApi).subscribe(res => this.perfil = res);
  }


  public onClick(event: any): void 
  {
    this.router.navigate(['/login']);

  }

  public onClickReg(event: any): void 
  {
    this.router.navigate(['/register']);

  }

}
