class Registro {
    id
    fecha
    concepto
    cuantia

    constructor(id, concepto, cuantia, fecha) {
        this.id = id
        this.concepto = concepto
        this.cuantia = cuantia
        this.fecha = fecha
    }

    getCuantia() {
        return this.cuantia
    }
    setId(id) {
        this.id = id
    }
    getId() {
        return this.id
    }
    getConcepto() {
        return this.concepto
    }
    getFecha() {
        return this.fecha
    }
}