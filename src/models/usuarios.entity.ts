
import {Pedido} from "../models/pedido.entity";

export class Usuario {
  constructor(
    public nombre: string, 
    public apellido: string, 
    public dni:string, 
    public fechaNacimiento:string, 
    public mail:string,
    public id:number,
    public pedidos?: Pedido[] //ojo aca
)   {}
}

//mirar los videos de mikro para ver como hacerlo con sql