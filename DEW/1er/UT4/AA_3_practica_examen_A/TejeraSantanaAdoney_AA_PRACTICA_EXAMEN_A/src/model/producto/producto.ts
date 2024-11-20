export class Producto {
  #nombre: string
  #precioInicial: number

  constructor (nombre:string, precioInicial:number) {
    this.#nombre = nombre
    this.#precioInicial = precioInicial
  }

  getNombre() {
    return this.#nombre
  }
  getPrecioInicial() {
    return this.#precioInicial
  }
}
