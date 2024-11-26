import { Ciudad } from "../ciudad/ciudad";
import { Pais } from "../pais/pais";

export class Direccion {
  #pais:Pais
  #ciudad:Ciudad

  constructor (pais:Pais, ciudad:Ciudad|null = null) {
    this.#pais = pais

    if (!ciudad) {//Si no se pasa una ciudad, se establece una aleatoria
      this.#ciudad = pais.getCiudades()[0]
      this.selectRandomCiudad()

    } else {
      this.#ciudad = ciudad
    }
  }

  getPais() {
    return this.#pais
  }
  getCiudad() {
    return this.#ciudad
  }

  selectRandomCiudad() {
    const posicion = Math.round(Math.random()*(this.#pais.getCiudades().length-1))

    this.#ciudad = this.#pais.getCiudades()[posicion]
  }

}
