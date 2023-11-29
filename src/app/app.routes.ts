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
import { UsuariosComponent } from './pages/panel-admin/components/usuarios/usuarios.component';
import { PaquetesComponent } from './pages/panel-admin/components/paquetes/paquetes.component';
import { DestinosComponent } from './pages/panel-admin/components/destinos/destinos.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'menu', component: MenuComponent,
        loadChildren: () => import('./pages/menu/menu.routes'),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'login' },

];
