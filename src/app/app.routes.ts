import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RepartosComponent } from './pages/repartos/repartos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ComprobantesComponent } from './pages/comprobantes/comprobantes.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { AgregarRepartoComponent } from './pages/agregar-reparto/agregar-reparto.component';
import { authGuard } from './guard/auth.guard';
import { DetalleRepartoComponent } from './pages/detalle-reparto/detalle-reparto.component';
import { GenerarComprobanteComponent } from './pages/generar-comprobante/generar-comprobante.component';
import { DashboardComponent } from './drawer/dashboard/dashboard.component';
import { ProductsComponent } from './drawer/products/products.component';
import { StatisticsComponent } from './drawer/statistics/statistics.component';

export const routes: Routes = [
    /*{ path: 'login', component: LoginComponent },
    {
        path: 'menu', component: MenuComponent,
        children: [
            { path: 'repartos', component: RepartosComponent },
            { path: 'detalle-reparto', component: DetalleRepartoComponent },
            { path: 'generar-comprobante', component: GenerarComprobanteComponent },
            { path: 'clientes', component: ClientesComponent },
            { path: 'comprobantes', component: ComprobantesComponent },
            { path: 'panel-admin', component: PanelAdminComponent },
            { path: 'agregar-reparto', component: AgregarRepartoComponent },
        ],
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'login' },
    */


    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'statistics', component: StatisticsComponent }
];
