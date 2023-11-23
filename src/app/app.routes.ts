import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RepartosComponent } from './components/repartos/repartos.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'repartos', component: RepartosComponent },
    { path: '**', redirectTo: 'login' }
];
