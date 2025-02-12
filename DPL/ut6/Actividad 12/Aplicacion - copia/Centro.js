class Centro {
    id 
    aulas

    /**
     * Crea una instancia de Centro.
     * 
     * @constructor
     * @param {*} id 
     * @param {{}} [aulas=[]] 
     */
    constructor (id, aulas = []) {
        this.id = id
        this.aulas = aulas
    }
    /**
     * Retorna un Array de objetos Aulas del centro actual.
     *
     * @returns {Array} 
     */
    getAulas () {
        return this.aulas
    }

    /**
     * Añade un alumno a un aula determinada
     *
     * @param {Alumno} alumno 
     * @param {number} aulaId 
     */
    añadirAlumno(alumno, aulaId) {
        const aula = this.buscarAula(aulaId)

        aula.añadirAlumno(alumno)
    }

    /**
     * Busca y retorna el aula indicada
     *
     * @param {number} id 
     * @returns {Aula} 
     */
    buscarAula(id) {
        let aula = null

        this.aulas.forEach(aulaActual => {
            if (aulaActual.getId() == id) {
                aula = aulaActual
            }
        })

        return  aula
    }
}