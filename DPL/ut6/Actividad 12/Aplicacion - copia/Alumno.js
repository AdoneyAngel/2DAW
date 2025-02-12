class Alumno {
    id
    nombre

    /**
     * Crea una instancia de Alumno.
     *
     * @constructor
     * @param {number} id 
     * @param {string} nombre 
     */
    constructor (id = 0, nombre) {
        this.id = id
        this.nombre = nombre
    }

    /**
     * Retorna el id del Alumno
     *
     * @returns {number} 
     */
    getId() {
        return this.id
    }
    /**
     * Establece el id del alumno
     *
     * @param {number} id 
     */
    setId(id) {
        this.id = id
    }
    /**
     * Obtiene el nombre del alumno
     *
     * @returns {string} 
     */
    getNombre() {
        return this.nombre
    }
}