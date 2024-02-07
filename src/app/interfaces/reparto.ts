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
    id_usuario?: number;
    nombre_usuario?: string;
    cliente?: Cliente;
    id_comprobante?: number;
    comprobante?: {
        tipo_comprobante?: number;
        serie?: string;
        num_serie?: number;
    }
    items?: ItemReparto[];
    total?: number;
    activo?: string;
    historial?: HistorialReparto[];
}

export interface HistorialReparto {
    id?: number;
    id_reparto?: number;
    id_usuario?: number;
    id_tipo_operacion?: number;
    tipo_operacion?: string;
    fecha?: string;
    nombre?: string;
}
