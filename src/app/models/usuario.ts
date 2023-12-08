export class Usuario {
    id?: number;
    documento?: string;
    nombres?: string;
    ape_paterno?: string;
    ape_materno?: string;
    telefono?: string;
    correo?: string;
    fecha_nac?: string;
    fecha_creacion?: string;
    clave?: string;
    cod_rol?: string;
    rol?: string;
    activo?: string;

    constructor(data: any) {
        this.id = data?.id;
        this.documento = data?.documento;
        this.nombres = data?.nombres;
        this.ape_paterno = data?.ape_paterno;
        this.ape_materno = data?.ape_materno;
        this.telefono = data?.telefono;
        this.correo = data?.correo;
        this.fecha_nac = data?.fecha_nac;
        this.fecha_creacion = data?.fecha_creacion;
        this.clave = data?.clave;
        this.cod_rol = data?.cod_rol;
        this.rol = data?.rol;
        this.activo = data?.activo;
    }

    getFechaNac(){
        if(this.fecha_nac){
            const date = new Date(this.fecha_nac);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return null;
    }

    getFechaCreacion(){
        if(this.fecha_creacion){
            const date = new Date(this.fecha_creacion);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return null;
    }
}
