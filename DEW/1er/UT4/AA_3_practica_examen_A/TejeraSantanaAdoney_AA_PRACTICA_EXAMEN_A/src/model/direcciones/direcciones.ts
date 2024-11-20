import { Direccion } from "../direccion/direccion";

export class Direcciones {
  #direcciones:Direccion[]
  #direccionElegida:Direccion|null

  constructor (direcciones:Direccion[], direccionElegida:Direccion|null = null) {
    this.#direcciones = direcciones
    this.#direccionElegida = direccionElegida
  }

  getDirecciones() {
    return this.#direcciones
  }
  getDireccionElegida() {
    return this.#direccionElegida
  }

  setDireccionElegida(direccionElegida:Direccion) {
    this.#direccionElegida = direccionElegida
  }
  añadirDireccion(direccion:Direccion) {
    this.#direcciones.push(direccion)
  }

}
