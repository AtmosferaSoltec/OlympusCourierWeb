import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { authGuard } from './guard/auth.guard';
import { LoginMainComponent } from './pages/login-main/login-main.component';
import { TestComponent } from './test/test.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginMainComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'test', component: TestComponent },
  {
    path: 'menu',
    component: MenuComponent,
    loadChildren: () => import('./pages/menu/menu.routes'),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
