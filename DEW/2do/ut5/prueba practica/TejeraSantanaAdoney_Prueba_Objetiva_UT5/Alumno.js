class Alumno {
    id
    nombre

    constructor (id = 0, nombre) {
        this.id = id
        this.nombre = nombre
    }

    getId() {
        return this.id
    }
    setId(id) {
        this.id = id
    }
    getNombre() {
        return this.nombre
    }
}