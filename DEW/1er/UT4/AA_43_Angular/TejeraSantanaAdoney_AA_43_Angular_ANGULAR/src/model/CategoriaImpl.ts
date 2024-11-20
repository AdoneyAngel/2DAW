import { Categoria } from "./Categoria";

export class CategoriaImpl implements Categoria {
  id: number
  nombre: string
  descripcion: string;

  constructor(id:number, nombre:string, descripcion:string) {
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
  }

  getInfo(): string {
    return "ID: "+this.id+", Nombre: "+this.nombre+", Descripcion: "+this.descripcion
  }
}
