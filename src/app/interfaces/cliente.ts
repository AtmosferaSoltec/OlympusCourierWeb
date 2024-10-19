export interface Cliente {
    id?: number;
    cod_tipodoc?: string;
    documento?: string;
    nombres?: string;
    telefono?: string;
    correo?: string;
    genero?: string;
    id_distrito?: number;
    distrito?: string;
    direc?: string;
    referencia?: string;
    url_maps?: string;
    fecha_creacion?: Date;
    activo?: string;
}
