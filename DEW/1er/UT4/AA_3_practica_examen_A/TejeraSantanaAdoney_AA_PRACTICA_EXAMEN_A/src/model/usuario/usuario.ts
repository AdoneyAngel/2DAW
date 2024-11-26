import { Compra } from "../compra/compra"
import { Direcciones } from "../direcciones/direcciones"
import { HistorialCompras } from "../historialCompras/historial-compras"

export class Usuario {
  #id: number
  #nombre: string
  #nacimiento: Date
  #direccion: Direcciones
  #historial: HistorialCompras
  #edad:number

  constructor (id: number, nombre: string, nacimiento: Date = new Date(), direccion: Direcciones, historial: HistorialCompras) {
    this.#id = id
    this.#nombre = nombre
    this.#nacimiento = nacimiento
    this.#direccion = direccion
    this.#historial = historial

    //Calcular edad
    const fechaActual = new Date()
    this.#edad = Math.round((fechaActual.getTime()-nacimiento.getTime())/(1000*60*60*24*365))
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
  getEdad() {
    return this.#edad
  }

  genRandom() {

  }
}
