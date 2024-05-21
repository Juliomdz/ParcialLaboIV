import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { ActorAltaComponent } from './pages/actor/actor-alta/actor-alta.component';
import { PeliculaListadoComponent } from './pages/peliculas/pelicula-listado/pelicula-listado.component';
import { ActorListadoComponent } from './pages/actor/actor-listado/actor-listado.component';
import { PeliculaAltaComponent } from './pages/peliculas/peliculas-alta/pelicula-alta.component';

const routes: Routes = [
  {path:'bienvenido', component:BienvenidoComponent},
  {path:'', component:BusquedaComponent},
  {path:'busqueda', component:BusquedaComponent},
  {path:'peliculas/alta', component:PeliculaAltaComponent},
  {path:'actor/alta', component:ActorAltaComponent},
  {path:'actor/listado', component:ActorListadoComponent},
  {path:'peliculas/listado', component:PeliculaListadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
