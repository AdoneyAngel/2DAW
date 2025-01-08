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
}