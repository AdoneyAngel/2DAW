import { Ciudad } from "../ciudad/ciudad"

export class Pais {
  #nombre:string
  #ciudades: Ciudad[]

  constructor (nombre: string, ciudades: Ciudad[]) {
    this.#nombre = nombre
    this.#ciudades = ciudades
  }

  getNombre() {
    return this.#nombre
  }
  getCiudades() {
    return this.#ciudades
  }
}
