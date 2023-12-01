import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'menu', component: MenuComponent,
        loadChildren: () => import('./pages/menu/menu.routes'),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'login' },

];
