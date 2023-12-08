export class TipoPaquete {
    id?: number;
    nombre?: string;
    fecha_creacion?: string;
    activo?: string;

    constructor(data: any) {
        this.id = data?.id;
        this.nombre = data?.nombre;
        this.fecha_creacion = data?.fecha_creacion;
        this.activo = data?.activo;
    }

    getFechaCreacion() {
        if (this.fecha_creacion) {
            const date = new Date(this.fecha_creacion);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return null;
    }
    getHora(){
        if(this.fecha_creacion){
            const date = new Date(this.fecha_creacion);
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const second = String(date.getSeconds()).padStart(2, '0');
            return `${hour}:${minute}:${second}`;
        }
        return null;
    }
}
