import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { authGuard } from './guard/auth.guard';
import { LoginMainComponent } from './pages/login-main/login-main.component';

export const routes: Routes = [
    { path: 'login', component: LoginMainComponent },
    {
        path: 'menu', component: MenuComponent,
        loadChildren: () => import('./pages/menu/menu.routes'),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'login' },

];
