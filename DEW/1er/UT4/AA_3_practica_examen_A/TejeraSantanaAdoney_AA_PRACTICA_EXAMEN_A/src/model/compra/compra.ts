import { Producto } from "../producto/producto";

export class Compra {
  #producto: Producto
  #fecha: Date
  #estado: string
  #descuento: number

  constructor (producto:Producto, fecha:Date, estado:string, descuento:number = 0) {
    this.#producto = producto
    this.#estado = estado
    this.#fecha = fecha
    this.#descuento = descuento
  }

  getProducto() {
    return this.#producto
  }
  getFecha() {
    return this.#fecha
  }
  getEstado() {
    return this.#estado
  }
  getDescuento() {
    return this.#descuento
  }

  setDescuento(descuento:number) {
    this.#descuento = descuento
  }

  getPrecioFinal() {
    const precioFinal = this.#producto.getPrecioInicial() * (1 - this.#descuento)

    return precioFinal
  }
}
