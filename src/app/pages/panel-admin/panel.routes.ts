import { Route } from "@angular/router";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { DestinosComponent } from "./components/distritos/distritos.component";
import { PaquetesComponent } from "./components/paquetes/paquetes.component";
import { ComprobantesAdminComponent } from "./components/comprobantes-admin/comprobantes-admin.component";
import { MetodoPagoComponent } from "./components/metodo-pago/metodo-pago.component";
import { VehiculoComponent } from "./components/vehiculo/vehiculo.component";

export default [
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'distritos', component: DestinosComponent },
    { path: 'tipo-paquetes', component: PaquetesComponent },
    { path: 'comprobantes-admin', component: ComprobantesAdminComponent },
    { path: 'metodo-pago', component: MetodoPagoComponent },
    { path: 'vehiculos', component: VehiculoComponent },
] as Route[]