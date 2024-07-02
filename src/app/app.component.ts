import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { HomeComponent } from './home/home.component';
import { AltaComponent } from './home/alta/alta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, BienvenidoComponent,ReactiveFormsModule, HomeComponent, AltaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parcial';
}
