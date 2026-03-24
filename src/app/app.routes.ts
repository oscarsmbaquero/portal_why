import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '', //raiz de la app
    pathMatch: 'full', //coincida nombre exacto
    component: InicioComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
