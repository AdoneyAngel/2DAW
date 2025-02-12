class Aula {
    id
    nombre
    alumnos

    /**
     * Crea una instancia de Aula.
     *
     * @constructor
     * @param {number} id 
     * @param {string} nombre 
     * @param {Array} [alumnos=[]] 
     */
    constructor (id, nombre, alumnos = []) {
        this.id = id
        this.nombre = nombre
        this.alumnos = alumnos
    }
    /**
     * Retorna el ID del aula
     *
     * @returns {number} 
     */
    getId() {
        return this.id
    }
    /**
     * Retorna el nombre del aula
     *
     * @returns {string} 
     */
    getNombre() {
        return this.nombre
    }
    /**
     * Retorna la lista de alumnos del aula
     *
     * @returns {Array} 
     */
    getAlumnos() {
        return this.alumnos
    }

    /**
     * Añade un nuevo alumno al aula
     * 
     * Genera automáticamente el id del alumno
     *
     * @param {Alumno} alumno 
     */
    añadirAlumno(alumno) {
        const idAlumno = this.generarAlumnoId()

        alumno.setId(idAlumno)

        this.alumnos.push(alumno)
    }

    /**
     * Genera el id para un alumno
     *
     * @returns {number} 
     */
    generarAlumnoId() {
        let nuevoId = 1
        let idValido = false
        
        while (!idValido) {
            idValido = true

            this.alumnos.forEach(alumnoActual => {
                if (alumnoActual.getId() == nuevoId) {
                    idValido = false
                }
            })

            if (!idValido) {
                nuevoId++
            }
        }

        return nuevoId
    }
}