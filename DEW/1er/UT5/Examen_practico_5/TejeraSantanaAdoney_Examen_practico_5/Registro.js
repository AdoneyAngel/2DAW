class Registro {
    libros

    constructor (libros=[]) {
        this.libros = libros
    }
    getLibros() {
        return this.libros
    }
    addLibro(libro) {
        this.libros.push(libro)
    }
}