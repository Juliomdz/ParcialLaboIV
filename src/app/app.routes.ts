import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { infoGuard } from './guards/info.guard';
import { loggedGuard } from './guards/logged.guard';

export const routes: Routes = [
    {
        path: 'bienvenido',
        loadComponent: () => import('./bienvenido/bienvenido.component').then((m) => m.BienvenidoComponent),
    },
    {
        path: '',
        redirectTo: '/bienvenido',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        canActivate: [loggedGuard]
    },
    {
        path: 'home/alta',
        loadComponent: () => import('./home/alta/alta.component').then(m => m.AltaComponent),
        canActivate: [loggedGuard], canDeactivate: [infoGuard]
    },
    {
        path: 'home/lista',
        loadComponent: () => import('./home/lista-elementos/lista.component').then(m => m.ListaComponent),
        canActivate: [loggedGuard]
    },
    {
        path: 'home/salen',
        loadComponent: () => import('./home/salen-elementos/salen-elementos.component').then(m => m.SalenElementosComponent),
        canActivate: [loggedGuard,adminGuard]
        
    },
];
