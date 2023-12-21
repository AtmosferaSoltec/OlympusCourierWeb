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
    id_usuario?: number;
    fecha_creacion?: string;
    activo?: string;
    enlace?: string;
    estado_sunat?: number;
    sunat_descrip?: string;
    enlace_pdf?: string;
    enlace_xml?: string;
}