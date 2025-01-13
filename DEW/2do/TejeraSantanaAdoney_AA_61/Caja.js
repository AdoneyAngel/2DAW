class Caja {
    id
    nombre
    registros = []

    constructor(id, nombre, registros = []) {
        this.id = id
        this.nombre = nombre
        this.registros = registros
    }

    getRegistros() {
        return this.registros
    }
    getId() {
        return this.id
    }

    getTotal() {
        let total = 0

        for (let registro of this.registros) {
            total += Number(registro.getCuantia())
        }

        return total
    }

    insertarRegistro(registro) {
        const registroId = this.generarRegistroId()
        
        registro.setId(registroId)
        this.registros.push(registro)
    }

    generarRegistroId() {
        let id = 0
        let repetido = true

        while (repetido) {
            repetido = false

            for (let registro of this.registros) {
                if (id == registro.getId()) {
                    repetido = true
                    break
                }
            }

            if (repetido) {
                id++
            }
        }

        return id
    }

    eliminarRegistro(idRegistro) {
        const nuevoRegistros = this.registros.filter(registroActual => registroActual.getId() != idRegistro)

        this.registros = nuevoRegistros
    }
    
    getRegistro(idRegistro) {
        const registro = this.registros.find(conceptoActual => conceptoActual.getId() == idRegistro)

        return registro
    }

    editarRegistro(idRegistro, valores) {
        const registro = this.getRegistro(idRegistro)

        registro.setFecha(valores.fecha)
        registro.setCuantia(valores.cuantia)
        registro.setConcepto(valores.concepto)
    }
}