class Libro {
    isbn
    titulo
    genero
    fecha
    blackfriday
    autor
    precio
    descuento
    precioFinal

    constructor (isbn, titulo, genero, fecha, blackfriday, autor, precio, descuento, precioFinal) {
        this.isbn = isbn
        this.titulo = titulo
        this.genero = genero
        this.fecha = fecha
        this.blackfriday = blackfriday
        this.autor = autor
        this.precio = precio
        this.descuento = descuento
        this.precioFinal = precioFinal
    }
    getIsbn() {
        return this.isbn
    }
    getTitulo() {
        return this.titulo
    }
    getGenero() {
        return this.genero
    }
    getFecha() {
        return this.fecha
    }
    getBlackfriday() {
        return this.blackfriday
    }
    getAutor() {
        return this.autor
    }
    getPrecio() {
        return this.precio

    }
    getPrecioFinal() {
        return this.precioFinal
    }
    getDescuento() {
        return this.descuento
    }
}