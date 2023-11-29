import { Route } from '@angular/router';
import { AgregarRepartoComponent } from '../agregar-reparto/agregar-reparto.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { ComprobantesComponent } from '../comprobantes/comprobantes.component';
import { DetalleRepartoComponent } from '../detalle-reparto/detalle-reparto.component';
import { GenerarComprobanteComponent } from '../generar-comprobante/generar-comprobante.component';
import { PanelAdminComponent } from '../panel-admin/panel-admin.component';
import { RepartosComponent } from '../repartos/repartos.component';

export default [
    { path: 'repartos', component: RepartosComponent },
    { path: 'detalle-reparto/:id', component: DetalleRepartoComponent },
    { path: 'generar-comprobante', component: GenerarComprobanteComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'comprobantes', component: ComprobantesComponent },
    {
        path: 'panel-admin',
        component: PanelAdminComponent,
        loadChildren: () => import('../panel-admin/panel.routes')
    },
    { path: 'agregar-reparto', component: AgregarRepartoComponent },
] as Route[]