class Aula {
    id
    nombre
    alumnos

    constructor (id, nombre, alumnos = []) {
        this.id = id
        this.nombre = nombre
        this.alumnos = alumnos
    }
    getId() {
        return this.id
    }
    getNombre() {
        return this.nombre
    }
    getAlumnos() {
        return this.alumnos
    }

    añadirAlumno(alumno) {
        const idAlumno = this.generarAlumnoId()

        alumno.setId(idAlumno)

        this.alumnos.push(alumno)
    }

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