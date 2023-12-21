import { Cliente } from "./cliente";
import { ItemReparto } from "./item-reparto";

export interface Reparto {
    id?: number;
    id_ruc?: string,
    num_reparto?: number;
    anotacion?: string;
    clave?: string;
    estado?: string;
    fecha_creacion?: string;
    fecha_entrega?: string;
    id_cliente?: number;
    cliente?: Cliente;
    id_usuario?: number;
    usuario?: any;
    id_repartidor?: number;
    repartidor?: any;
    id_comprobante?: number;
    comprobante?: {
        tipo_comprobante?: number;
        serie?: string;
        num_serie?: number;
    }
    items?: ItemReparto[];
    total?: number;
    activo?: string;
}
