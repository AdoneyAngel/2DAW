//--------------------------Generar datos iniciales
const conceptoIngreso = new Concepto(0, "Ingreso")
const conceptoGasto = new Concepto(1, "Gasto")
const conceptoOtros = new Concepto(2, "Otros")

const conceptos = [conceptoIngreso, conceptoGasto, conceptoOtros]

const caja1 = new Caja(0, "Caja1")
const caja2 = new Caja(1, "Caja2")
const caja3 = new Caja(2, "Caja3")

const cajas = [caja1, caja2, caja3]

const banco = new Banco(cajas)







//--------------------------Generar vista
const tituloFormulario = document.createElement("h1")
const formulario = document.createElement("div")

//------------formulario
const label = document.createElement("label")
const inputFecha = document.createElement("input")
const inputConcepto = document.createElement("select")
const inputCuantia = document.createElement("input")
const inputCaja = document.createElement("select")
const btnAñadirRegistro = document.createElement("button")

tituloFormulario.textContent = "Insertar Nuevo Registro"
formulario.appendChild(tituloFormulario)

inputFecha.type = "date"
inputCuantia.type = "number"

btnAñadirRegistro.innerHTML = "Añadir Registro"
btnAñadirRegistro.addEventListener("click", añadirRegistro)

//Rellenar los select's
for (concepto of conceptos) {
    const optionConcepto = document.createElement("option")
    optionConcepto.value = concepto.id
    optionConcepto.text = concepto.nombre

    inputConcepto.appendChild(optionConcepto)
}

for (caja of cajas) {
    const optionCaja = document.createElement("option")
    optionCaja.value = caja.id
    optionCaja.text = caja.nombre

    inputCaja.appendChild(optionCaja)
}

formulario.id = "formulario"

label.innerHTML = "Fecha: "
formulario.appendChild(label.cloneNode(true))
formulario.appendChild(inputFecha)

label.innerHTML = "Concepto: "
formulario.appendChild(label.cloneNode(true))
formulario.appendChild(inputConcepto)

label.innerHTML = "Cuantía: "
formulario.appendChild(label.cloneNode(true))
formulario.appendChild(inputCuantia)

label.innerHTML = "Caja: "
formulario.appendChild(label.cloneNode(true))
formulario.appendChild(inputCaja)

formulario.appendChild(btnAñadirRegistro)

document.body.appendChild(formulario)

//------------Tabla
const tituloTabla = document.createElement("h1")
const seccionBanco = document.createElement("section")
const tabla = document.createElement("table")
const thTabla = document.createElement("th")
const trTabla = document.createElement("tr")
const theadTabla = document.createElement("thead")
const tbodyTabla = document.createElement("tbody")

const inputConceptoFiltro = document.createElement("select")
const inputCajaFiltro = document.createElement("select")
const btnResetearFiltro = document.createElement("button")
const btnFiltro = document.createElement("button")
const optionTodos = document.createElement("option")

btnFiltro.innerHTML = "Filtrar"
btnResetearFiltro.innerHTML = "Resetear"

btnFiltro.addEventListener("click", cargarTabla)
btnResetearFiltro.addEventListener("click", resetearTabla)

tituloTabla.textContent = "Filtro Registro"
seccionBanco.appendChild(tituloTabla)

optionTodos.value = -1
optionTodos.text = "Todos"

inputConceptoFiltro.appendChild(optionTodos)

for (concepto of conceptos) {
    const optionConcepto = document.createElement("option")
    optionConcepto.value = concepto.id
    optionConcepto.text = concepto.nombre

    inputConceptoFiltro.appendChild(optionConcepto)
}

for (caja of cajas) {
    const optionCaja = document.createElement("option")
    optionCaja.value = caja.id
    optionCaja.text = caja.nombre

    inputCajaFiltro.appendChild(optionCaja)
}

label.innerHTML = "Seleccione un concepto: "
seccionBanco.appendChild(label.cloneNode(true))
seccionBanco.appendChild(inputConceptoFiltro)

label.innerHTML = "Caja: "
seccionBanco.appendChild(label.cloneNode(true))
seccionBanco.appendChild(inputCajaFiltro)

seccionBanco.appendChild(btnFiltro)
seccionBanco.appendChild(btnResetearFiltro)

thTabla.innerHTML = "ID"
trTabla.appendChild(thTabla.cloneNode(true))

thTabla.innerHTML = "Fecha"
trTabla.appendChild(thTabla.cloneNode(true))

thTabla.innerHTML = "Concepto"
trTabla.appendChild(thTabla.cloneNode(true))

thTabla.innerHTML = "Cuantía"
trTabla.appendChild(thTabla.cloneNode(true))

theadTabla.appendChild(trTabla.cloneNode(true))

tabla.appendChild(theadTabla)
tabla.appendChild(tbodyTabla)

seccionBanco.appendChild(tabla)
document.body.appendChild(seccionBanco)



//--------------------------Métodos
function añadirRegistro() {
    const validacion = validarNuevoRegistro()

    if (validacion === true) {
        const cajaSeleccionada = inputCaja.options[inputCaja.selectedIndex].value
        const conceptoSeleccionado = conceptos.find(concepto => concepto.getId() == inputConcepto.options[inputConcepto.selectedIndex].value)

        const nuevoRegistro = new Registro(0, conceptoSeleccionado, inputCuantia.value, inputFecha.value)

        banco.insertarRegistro(cajaSeleccionada, nuevoRegistro)
        
    } else {
        alert(validacion)
    }
}

function validarNuevoRegistro() {
    //Fecha
    const fecha = new Date(inputFecha.value)
    const fechaActual = new Date()
    
    if (isNaN(Number(fecha.getTime()))) {
        return "Fecha inválida"
    }
    if (fechaActual.getTime() < fecha.getTime()) {
        return "La fecha no puede ser posterior a la actual"
    }

    //Cuantia
    const cuantia = inputCuantia.value
    if (isNaN(Number(cuantia))) {
        return "Cuantía inválida"
    }
    if (cuantia == 0) {
        return "La cuantía debe ser distinto de 0"
    }
    if (cuantia < 0) {
        const cajaSeleccionada = banco.getCajas().find(caja => caja.getId() == inputCaja.options[inputCaja.selectedIndex].value)

        if (cajaSeleccionada.getTotal() < Math.abs(cuantia)) {
            return "En la cuenta seleccionada no hay suficiente dinero para retirar"
        }    
    }

    return true
}

function cargarTabla() {
    vaciarTabla()

    const cajaId = inputCajaFiltro.options[inputCajaFiltro.selectedIndex].value
    const conceptoId = inputConceptoFiltro.options[inputConceptoFiltro.selectedIndex].value

    let registros = []
    let total = 0

    //Se filtra por caja
    registros = banco.getRegistrosCaja(cajaId)

    //Se filtra los restatnes por concepto
    if (conceptoId != -1) {
        registros = registros.filter(registro => registro.getConcepto().getId() == conceptoId)
    }
    
    //Rellenar tabla
    registros.forEach(registro => {
        const fila = document.createElement('tr')
        const td = document.createElement('td')

        td.innerHTML = registro.getId()
        fila.appendChild(td.cloneNode(true))

        td.innerHTML = registro.getFecha()
        fila.appendChild(td.cloneNode(true))

        td.innerHTML = registro.getConcepto().getNombre()
        fila.appendChild(td.cloneNode(true))

        td.innerHTML = registro.getCuantia()
        fila.appendChild(td.cloneNode(true))

        tbodyTabla.appendChild(fila)

        total += Number(registro.getCuantia())
    })

    //Dinero final
    const filaTotal = document.createElement("tr")
    const tdTotal = document.createElement("td")

    tdTotal.innerHTML = "Total: "
    tdTotal.colSpan = 3
    filaTotal.appendChild(tdTotal.cloneNode(true))

    tdTotal.innerHTML = total
    tdTotal.colSpan = 1
    filaTotal.appendChild(tdTotal.cloneNode(true))

    tbodyTabla.appendChild(filaTotal)
}

function vaciarTabla() {
    const elementosDeTabla = document.querySelectorAll("tbody > tr")

    for (elemento of elementosDeTabla) {
        elemento.remove()
    }
}

function resetearTabla() {
    vaciarTabla()
}