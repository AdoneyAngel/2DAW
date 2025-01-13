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
    setCuantia(cuantia) {
        this.cuantia = cuantia
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
    setConcepto(concepto) {
        this.concepto = concepto
    }
    getFecha() {
        return this.fecha
    }
    setFecha(fecha) {
        this.fecha = fecha
    }
}