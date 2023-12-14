export interface Comprobante {
    id?: number;
    id_reparto?: number;
    tipo_comprobante?: number;
    serie?: string;
    num_serie?: number;
    id_metodo_pago?: number;
    num_operacion?: string;
    foto_operacion?: string;
    tipo_doc?: string;
    documento?: string;
    nombre?: string;
    direc?: string;
    correo?: string;
    telefono?: string;
    enlace?: string;
    url_pdf?: string;
    url_xml?: string;
    url_cdr?: string;
    id_usuario?: number;
    fecha_creacion?: string;
    activo?: string;
}