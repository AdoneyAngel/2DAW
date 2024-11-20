export class Ciudad {
  #nombre: string

  constructor(nombre: string) {
    this.#nombre = nombre
  }

  getNombre() {
    return this.#nombre
  }
}
