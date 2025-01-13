class Banco {
    cajas = []

    constructor(cajas) {
        this.cajas = cajas
    }

    getCajas() {
        return this.cajas
    }

    getTotal() {
        let total = 0

        for (let caja of this.cajas) {
            for (let registro of caja.getRegistros()) {
                total += registro.getCuantia()
            }
        }

        return total
    }

    insertarRegistro(cajaId, registro) {
        const caja = this.buscarCaja(cajaId)

        caja.insertarRegistro(registro)
    }

    getRegistrosCaja(cajaId) {
        const caja = this.buscarCaja(cajaId)

        return caja.getRegistros()
    }

    getRegistros() {
        let registros = []

        for (caja of this.cajas) {
            registros = [...caja.getRegistros()]
        }

        return registros
    }
 
    buscarCaja(cajaId) {
        const caja = this.cajas.find(caja => caja.getId() == cajaId)

        return caja
    }

    eliminarRegistro(cajaId, registroId) {
        const caja = this.buscarCaja(cajaId)

        caja.eliminarRegistro(registroId)
    }

    editarRegistro(cajaId, registroId, valores) {
        const caja = this.buscarCaja(cajaId)

        caja.editarRegistro(registroId, valores)
    }
}