import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { ActorAltaComponent } from './pages/actor/actor-alta/actor-alta.component';
import { PeliculaListadoComponent } from './pages/peliculas/pelicula-listado/pelicula-listado.component';
import { ActorListadoComponent } from './pages/actor/actor-listado/actor-listado.component';
import { PeliculaAltaComponent } from './pages/peliculas/peliculas-alta/pelicula-alta.component';
import { TablaPeliculasComponent } from './pages/peliculas/tabla-pelicula/tabla-peliculas.component';
import { DetallePeliculaComponent } from './pages/peliculas/detalle-pelicula/detalle-pelicula.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { TablaPaisComponent } from './components/tabla-pais/tabla-pais.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    BusquedaComponent,
    PeliculaAltaComponent,
    PeliculaListadoComponent,
    ActorAltaComponent,
    ActorListadoComponent,
    TablaPeliculasComponent,
    DetallePeliculaComponent,
    TablaPaisComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
