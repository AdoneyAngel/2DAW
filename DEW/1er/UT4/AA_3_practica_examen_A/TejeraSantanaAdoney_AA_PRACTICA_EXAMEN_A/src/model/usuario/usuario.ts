import { Compra } from "../compra/compra"
import { Direcciones } from "../direcciones/direcciones"
import { HistorialCompras } from "../historialCompras/historial-compras"

export class Usuario {
  #id: number
  #nombre: string
  #nacimiento: Date
  #direccion: Direcciones
  #historial: HistorialCompras

  constructor (id: number, nombre: string, nacimiento: Date = new Date(), direccion: Direcciones, historial: HistorialCompras) {
    this.#id = id
    this.#nombre = nombre
    this.#nacimiento = nacimiento
    this.#direccion = direccion
    this.#historial = historial
  }

  getId() {
    return this.#id
  }
  getNombre() {
    return this.#nombre
  }
  getNacimiento() {
    return this.#nacimiento
  }
  getDireccion() {
    return this.#direccion
  }
  getHistorial() {
    return this.#historial
  }

  genRandom() {

  }
}
