export class Actor{
    nombre: string;
    apellido: string;
    edad: string;
    pais: string;
    foto:string
  
    constructor(nombre: string, apellido: string, edad: string, pais: string,foto:string) 
    {
      //this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.pais = pais;
      this.foto = foto;
    }
}