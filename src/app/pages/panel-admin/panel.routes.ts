import { Route } from "@angular/router";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { DestinosComponent } from "./components/distritos/distritos.component";
import { PaquetesComponent } from "./components/paquetes/paquetes.component";

export default [
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'destinos', component: DestinosComponent },
    { path: 'paquetes', component: PaquetesComponent }
] as Route[]