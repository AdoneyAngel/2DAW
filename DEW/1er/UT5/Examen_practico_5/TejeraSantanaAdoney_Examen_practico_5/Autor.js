class Autor {
    id
    nombre

    constructor (id, nombre) {
        this.id = id
        this.nombre = nombre
    }
    getNombre() {
        return this.nombre
    }
    getId() {
        return this.id
    }
}