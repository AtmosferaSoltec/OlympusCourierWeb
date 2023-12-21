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
    nubefact?: Nubefact;
}

export interface Nubefact {
    tipo_de_comprobante?: string;
    serie?: string;
    numero?: string;
    enlace?: string;
    aceptada_por_sunat?: string;
    sunat_description?: string;
    sunat_note?: string;
    sunat_responsecode?: string;
    sunat_soap_error?: string;
    anulado?: string;
    pdf_zip_base64?: string;
    xml_zip_base64?: string;
    cdr_zip_base64?: string;
    cadena_para_codigo_qr?: string;
    codigo_hash?: string;
    enlace_del_pdf?: string;
    enlace_del_xml?: string;
    enlace_del_cdr?: string;
}