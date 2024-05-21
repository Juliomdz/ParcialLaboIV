export enum ETipoPelicula{
    Terror = 'Terror',
    Comedia = 'Comedia',
    Amor = 'Amor',
    Otros = 'Otros'
}

export class Pelicula{
    id:number
    nombre:string
    tipo:ETipoPelicula
    fechaEstreno:Date
    cantidadPublico:number
    foto:string

    constructor(id: number, nombre: string, tipo: ETipoPelicula, fechaEstreno: Date, cantidadPublico: number, foto: string) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.fechaEstreno = fechaEstreno;
        this.cantidadPublico = cantidadPublico;
        this.foto = foto;
    }
}