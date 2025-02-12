//--------Valores por defecto
const aula1 = new Aula(1, "Aula1")
const aula2 = new Aula(2, "Aula2")
const aula3 = new Aula(3, "Aula3")

const centro = new Centro(1, [aula1, aula2, aula3])




//Grafica
let graficaChart = null

window.onload = () => {
    var canvaGrafica = document.getElementById('grafica');

    graficaChart = new Chart(canvaGrafica, {
        type: 'bar',
        data: {
            labels: [], // Meses
            datasets: [{
                label: 'Alumnos',
                data: [],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Asegura que el eje Y comience en 0
                }
            }
        }
    });
}





//--------Generación de vista
//----Formulario

const formulario = document.createElement("div")
const tituloFormulario = document.createElement("h1")
const pFormularioNombre = document.createElement("p")
const inputFormularioNombre = document.createElement("input")
const pFormularioAula = document.createElement("p")
const selectFormularioAula = document.createElement("select")
const btnFormulario = document.createElement("button")

tituloFormulario.innerHTML = "Asignar Alumnos a Aula"

pFormularioNombre.innerHTML = "Nombre del Alumno:"
inputFormularioNombre.placeholder = "Juanito"
inputFormularioNombre.id = "inputNombreAlumno"

pFormularioAula.innerHTML = "Aula Asignada:"
selectFormularioAula.id = "selectAulaAlumno"

//Insertar options al select de aulas
centro.getAulas().forEach(aulaActual => {
    const optionAula = document.createElement("option")
    optionAula.value = aulaActual.getId()
    optionAula.innerHTML = aulaActual.getNombre()

    selectFormularioAula.appendChild(optionAula)
})

btnFormulario.innerHTML = "Añadir Alumno"
btnFormulario.addEventListener("click", () => añadirAlumno())

formulario.appendChild(tituloFormulario)
formulario.appendChild(pFormularioNombre)
formulario.appendChild(inputFormularioNombre)
formulario.appendChild(pFormularioAula)
formulario.appendChild(selectFormularioAula)
formulario.appendChild(btnFormulario)

document.body.appendChild(formulario)


//----Lista de alumnos
const tituloLista = document.createElement("h1")
const selectLista = document.createElement("select")
const tablaLista = document.createElement("table")
const theadTablaLista = document.createElement("thead")
const tbodyTablaLista = document.createElement("tbody")
const thTablaLista = document.createElement("th")
const trTablaLista = document.createElement("tr")

tituloLista.innerHTML = "Lista de Alumnos"

selectLista.id = "selectLista"
centro.getAulas().forEach(aulaActual => {
    const optionAula = document.createElement("option")
    optionAula.value = aulaActual.getId()
    optionAula.innerHTML = aulaActual.getNombre()

    selectLista.appendChild(optionAula)
})
selectLista.addEventListener("change", () => filtrarTabla())

const optionNoSeleccionado = document.createElement("option")
optionNoSeleccionado.selected = true
optionNoSeleccionado.value = -1
optionNoSeleccionado.innerHTML = "Sin filtrar"

selectLista.appendChild(optionNoSeleccionado)

tablaLista.id = "tabla"

thTablaLista.innerHTML = "Nombre"
trTablaLista.appendChild(thTablaLista.cloneNode(true))

thTablaLista.innerHTML = "Aula"
trTablaLista.appendChild(thTablaLista.cloneNode(true))

theadTablaLista.appendChild(trTablaLista)

tbodyTablaLista.id = "tbodyLista"

tablaLista.appendChild(theadTablaLista)
tablaLista.appendChild(tbodyTablaLista)

document.body.appendChild(tituloLista)
document.body.appendChild(selectLista)
document.body.appendChild(tablaLista)








//---------Funciones
function añadirAlumno() {
    const formularioInvalido = validarFormulario()
    if(formularioInvalido) {
        alert(formularioInvalido)
        return false
    }

    const nombreAlumno = formularioNombreSeleccionado()
    const aula = formularioAulaSeleccionada()

    const nuevoAlumno = new Alumno(0, nombreAlumno) //El id no importa asignarlo aqui, el aula se encarga de generarle un id unico para dicho aula

    centro.añadirAlumno(nuevoAlumno, aula.getId())

    //Se ajusta el aula seleccionado en la lista
    for (let optionIndex = 0; optionIndex<selectLista.options.length; optionIndex++) {
        const optionActual = selectLista.options[optionIndex]

        if (optionActual.value == aula.getId()) {
            optionActual.selected = true

        } else {
            optionActual.selected = false
        }
    }

    filtrarTabla()

    inputFormularioNombre.value = ""
}

function formularioAulaSeleccionada() {//Obtiene el aula seleccionada del formulario
    const aula = centro.buscarAula(selectFormularioAula.options[selectFormularioAula.selectedIndex].value)

    return aula
}
function formularioNombreSeleccionado() {//Obtiene el nombre del alumno del formulario
    return inputFormularioNombre.value
}
function listaAulaSeleccionada() {//Obtiene el aula seleccionada de la listas
    const aula = centro.buscarAula(selectLista.options[selectLista.selectedIndex].value)

    return aula
}

function filtrarTabla() {
    let aulas = []
    const optionSeleccionado = selectLista.options[selectLista.selectedIndex].value

    if (optionSeleccionado == -1) {
        aulas = centro.getAulas()

    } else {
        aulas = [listaAulaSeleccionada()]
    }

    cargarTabla(aulas)
    generarGrafica(aulas)
}

function cargarTabla(aulas) {
    vaciarTabla()

    aulas.forEach(aulaActual => {
        aulaActual.getAlumnos().forEach(alumnoActual => {
            const trTbody = document.createElement("tr")
            const tdTbody = document.createElement("td")
            
            tdTbody.innerHTML = alumnoActual.getNombre()
            trTbody.appendChild(tdTbody.cloneNode(true))
            
            tdTbody.innerHTML = aulaActual.getNombre()
            trTbody.appendChild(tdTbody.cloneNode(true))
    
            tbodyTablaLista.appendChild(trTbody)
        })
    })
}

function vaciarTabla() {
    const registros = document.querySelectorAll("#tbodyLista > tr")

    registros.forEach(trActual => trActual.remove())
}

function validarFormulario() {//Si retorna un texto es que ocurrió algo, si retorna null esque no ha pasado nada
    const nombre = formularioNombreSeleccionado()
    const aula = formularioAulaSeleccionada()

    if (nombre.trim().length < 1) {
        return "Debe ingresar un nombre para el alumno"
    }

    if (aula == null) {
        return "No se ha encontrado el aula seleccionada en el centro"
    }

    return false
}

function generarGrafica(aulas) {
    graficaChart.destroy()

    var canvaGrafica = document.getElementById('grafica');

    graficaChart = new Chart(canvaGrafica, {
        type: 'bar',
        data: {
            labels: aulas.map(aulaActual => aulaActual.getNombre()), // Meses
            datasets: [{
                label: 'Alumnos',
                data: aulas.map(aulaActual => aulaActual.getAlumnos().length),
                backgroundColor: [
                    'rgba(255, 99, 132, .7)',
                    'rgba(54, 162, 235, .7)',
                    'rgba(255, 206, 86, .7)',
                    'rgba(75, 192, 192, .7)',
                    'rgba(153, 102, 255, .7)',
                    'rgba(255, 159, 64, .7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Asegura que el eje Y comience en 0
                }
            }
        }
    });
}