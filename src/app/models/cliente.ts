export class Cliente {
    id?: number;
    cod_tipodoc?: string;
    documento?: string;
    nombres?: string;
    telefono?: string;
    correo?: string;
    genero?: string;
    id_distrito?: string;
    distrito?: string;
    direc?: string;
    referencia?: string;
    url_maps?: string;
    fecha_creacion?: string;
    activo?: string;

    constructor(data: any) {
        this.id = data?.id;
        this.cod_tipodoc = data?.cod_tipodoc;
        this.documento = data?.documento;
        this.nombres = data?.nombres;
        this.telefono = data?.telefono;
        this.correo = data?.correo;
        this.genero = data?.genero;
        this.id_distrito = data?.id_distrito;
        this.distrito = data?.distrito;
        this.direc = data?.direc;
        this.referencia = data?.referencia;
        this.url_maps = data?.url_maps;
        this.fecha_creacion = data?.fecha_creacion;
        this.activo = data?.activo;
    }

    getFecha() {
        if (this.fecha_creacion) {
            const date = new Date(this.fecha_creacion);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return null;
    }
}
