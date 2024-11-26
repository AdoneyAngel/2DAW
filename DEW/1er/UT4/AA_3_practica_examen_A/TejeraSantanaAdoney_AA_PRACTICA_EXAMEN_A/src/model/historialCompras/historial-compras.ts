import { Compra } from "../compra/compra";

export class HistorialCompras {
  #compras:Compra[]

  constructor (compras:Compra[]) {
    this.#compras = compras
  }

  getCompras() {
    return this.#compras
  }

  añadirCompra(compra:Compra) {
    this.#compras.push(compra)
  }

  getReporteTotal() {
    let reporteTotal = 0

    for (const compra of this.#compras) {
      reporteTotal += compra.getPrecioFinal()
    }

    return reporteTotal
  }

  establecerDescuento(descuento:number) {
    //Establecer descuento a cada una de las compras
    for (const compra of this.#compras) {
      compra.setDescuento(descuento)
    }
  }
}
