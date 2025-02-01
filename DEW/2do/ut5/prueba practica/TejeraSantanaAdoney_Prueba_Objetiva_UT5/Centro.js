class Centro {
    id 
    aulas

    constructor (id, aulas = []) {
        this.id = id
        this.aulas = aulas
    }
    getAulas () {
        return this.aulas
    }

    añadirAlumno(alumno, aulaId) {
        const aula = this.buscarAula(aulaId)

        aula.añadirAlumno(alumno)
    }

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