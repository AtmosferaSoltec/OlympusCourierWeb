import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RepartosComponent } from './pages/repartos/repartos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ComprobantesComponent } from './pages/comprobantes/comprobantes.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { AgregarRepartoComponent } from './pages/agregar-reparto/agregar-reparto.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'menu', component: MenuComponent,
        children: [
            { path: 'repartos', component: RepartosComponent },
            { path: 'clientes', component: ClientesComponent },
            { path: 'comprobantes', component: ComprobantesComponent },
            { path: 'panel-admin', component: PanelAdminComponent },
            { path: 'agregar-reparto', component: AgregarRepartoComponent },
        ],
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'login' }
];
