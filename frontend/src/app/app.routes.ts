import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import {Registro} from './pages/registro/registro';
import { Dashboard } from './pages/dashboard/dashboard';
import { Lugares } from './pages/lugares/lugares';
import { Perfil } from './pages/perfil/perfil';
import { Favoritos } from './pages/favoritos/favoritos';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'registro', component: Registro },
    { path: 'dashboard', component: Dashboard },
    { path: 'lugares', component: Lugares},
    { path: 'perfil', component: Perfil},
    { path: 'favoritos', component: Favoritos},
];
