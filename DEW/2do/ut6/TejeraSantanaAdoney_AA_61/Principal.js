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

const tituloTabla = document.createElement("h1")
const seccionBanco = document.createElement("section")
const tabla = document.createElement("table")
const thTablaId = document.createElement("th")
const thTablaFecha = document.createElement("th")
const thTablaConcepto = document.createElement("th")
const thTablaCuantia = document.createElement("th")
const thTablaAcciones = document.createElement("th")
const trTabla = document.createElement("tr")
const theadTabla = document.createElement("thead")
const tbodyTabla = document.createElement("tbody")
const tituloCaja = document.createElement("h2")

tituloCaja.id = "tituloCaja"
tituloCaja.innerHTML = ""

const inputConceptoFiltro = document.createElement("select")
const inputCajaFiltro = document.createElement("select")
const btnResetearFiltro = document.createElement("button")
const btnFiltro = document.createElement("button")
const optionTodos = document.createElement("option")

//Filtros
btnFiltro.innerHTML = "Filtrar"
btnResetearFiltro.innerHTML = "Resetear"

btnFiltro.addEventListener("click", cargarTablaFiltro)
btnResetearFiltro.addEventListener("click", () => {resetearTabla(); resetearFormulario();})

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

//Tabla
thTablaId.innerHTML = "ID"
thTablaId.addEventListener("click", cargarTablaOrdenId)
thTablaId.style.cursor = "pointer"
trTabla.appendChild(thTablaId)

thTablaFecha.innerHTML = "Fecha"
thTablaFecha.addEventListener("click", cargarTablaOrdenFecha)
thTablaFecha.style.cursor = "pointer"
trTabla.appendChild(thTablaFecha)

thTablaConcepto.innerHTML = "Concepto"
trTabla.appendChild(thTablaConcepto)

thTablaCuantia.innerHTML = "Cuantía"
thTablaCuantia.addEventListener("click", cargarTablaOrdenCuantia)
thTablaCuantia.style.cursor = "pointer"
trTabla.appendChild(thTablaCuantia)

thTablaAcciones.innerHTML = "Acciones"
trTabla.appendChild(thTablaAcciones)

theadTabla.appendChild(trTabla)

tabla.appendChild(theadTabla)
tabla.appendChild(tbodyTabla)

seccionBanco.appendChild(tituloCaja)
seccionBanco.appendChild(tabla)
document.body.appendChild(seccionBanco)















//--------------------------Métodos

function resetearFormulario() {
    inputFecha.value = 0
    inputCuantia.value = 0
}

function añadirRegistro() {
    const validacion = validarNuevoRegistro()

    if (validacion === true) {
        const cajaSeleccionada = inputCaja.options[inputCaja.selectedIndex].value
        const conceptoSeleccionado = conceptos.find(concepto => concepto.getId() == inputConcepto.options[inputConcepto.selectedIndex].value)

        const nuevoRegistro = new Registro(0, conceptoSeleccionado, inputCuantia.value, inputFecha.value)

        banco.insertarRegistro(cajaSeleccionada, nuevoRegistro)

        //Se cambia el option seleccionado del filtro para que se asigne la caja al que se ha insertado el registro
        for (let optIndex = 0; optIndex<inputCajaFiltro.length; optIndex++) {
            let optionCajaFiltroActual = inputCajaFiltro.options[optIndex]

            if (optionCajaFiltroActual.value == cajaSeleccionada) {
                optionCajaFiltroActual.selected = true

            } else {
                optionCajaFiltroActual.selected = false
            }
        }

        cargarTablaFiltro()
        
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

//Retorna todos los registros basados en el filtro
function cargarRegistros() {
    const cajaId = inputCajaFiltro.options[inputCajaFiltro.selectedIndex].value
    const conceptoId = inputConceptoFiltro.options[inputConceptoFiltro.selectedIndex].value

    let registros = []

    //Se filtra por caja
    registros = banco.getRegistrosCaja(cajaId)

    //Se filtra los restatnes por concepto
    if (conceptoId != -1) {
        registros = registros.filter(registro => registro.getConcepto().getId() == conceptoId)
    }

    return registros

}

//----------Funciones para cargar tabla
//-----Funciones para filtrar u ordenar tabla
function cargarTablaFiltro() {
    cargarTabla(cargarRegistros())
}

function cargarTablaOrdenId() {
    let registros = cargarRegistros()

    let registrosOrdenados = registros.sort((registroA, registroB) => {
        if (registroA.getId() > registroB.getId()) {
            return 1

        } else if (registroA.getId() < registroB.getId()) {
            return -1

        } else {
            return 0
        }
    })

    cargarTabla(registrosOrdenados)
}

function cargarTablaOrdenFecha() {
    let registros = cargarRegistros()

    let registrosOrdenados = registros.sort((registroA, registroB) => {
        const fechaA = new Date(registroA.getFecha())
        const fechaB = new Date(registroB.getFecha())
        
        if (fechaA.getTime() > fechaB.getTime()) {
            return -1

        } else if (fechaA.getTime() < fechaB.getTime()) {
            return 1

        } else {
            return 0
        }
    })

    cargarTabla(registrosOrdenados)
}

function cargarTablaOrdenCuantia() {
    let registros = cargarRegistros()

    let registrosOrdenados = registros.sort((registroA, registroB) => {
        
        if (Number(registroA.getCuantia()) > Number(registroB.getCuantia())) {
            return -1

        } else if (Number(registroA.getCuantia()) < Number(registroB.getCuantia())) {
            return 1

        } else if (Number(registroA.getCuantia()) == Number(registroB.getCuantia())){
            return 0
        }
    })

    cargarTabla(registrosOrdenados)
}

//-----Generar tabla
function cargarTabla(registros) {
    vaciarTabla()

    const cajaId = inputCajaFiltro.options[inputCajaFiltro.selectedIndex].value
    const caja = banco.buscarCaja(cajaId)
    let total = 0

    //Establecer titulo de la caja seleccionada
    const tituloCaja = document.getElementById("tituloCaja")
    tituloCaja.innerHTML = caja.getNombre()
    
    //Rellenar tabla
    registros.forEach(registro => {
        const fila = document.createElement('tr')
        const td = document.createElement('td')

        fila.id = registro.getId()

        td.innerHTML = registro.getId()
        td.id = "td_id"
        fila.appendChild(td.cloneNode(true))

        td.innerHTML = registro.getFecha()
        td.id = "td_fecha"
        fila.appendChild(td.cloneNode(true))

        td.innerHTML = registro.getConcepto().getNombre()
        td.id = "td_concepto"
        fila.appendChild(td.cloneNode(true))

        td.innerHTML = registro.getCuantia()
        td.id = "td_cuantia"
        fila.appendChild(td.cloneNode(true))

        //Botones acciones
        let btnAccionEliminar = document.createElement("button")
        let btnAccionEditar = document.createElement("button")

        btnAccionEliminar.id = "btnEliminar"
        btnAccionEditar.id = "btnEditar"

        btnAccionEliminar.innerHTML = "Eliminar"
        btnAccionEditar.innerHTML = "Editar"

        btnAccionEliminar.addEventListener("click", () => eliminarRegistro(cajaId, registro.getId()))
        btnAccionEditar.addEventListener("click", () => mostrarEditarRegistro(cajaId, registro.getId()))

        td.innerHTML = ""
        td.id = "td_acciones"
        td.appendChild(btnAccionEliminar)
        td.appendChild(btnAccionEditar)
        fila.appendChild(td)

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

function eliminarRegistro(cajaId, registroId) {
    banco.eliminarRegistro(cajaId, registroId)

    cargarTablaFiltro()
}

function mostrarEditarRegistro(cajaId, registroId) {
    cargarTablaFiltro()

    const tdFecha = document.querySelector("tr[id='"+registroId + "'] #td_fecha")
    const tdCuantia = document.querySelector("tr[id='"+registroId + "'] #td_cuantia")
    const tdConcepto = document.querySelector("tr[id='"+registroId + "'] #td_concepto")
    const tdAcciones = document.querySelector("tr[id='"+registroId + "'] #td_acciones")
    const btnEditar = document.querySelector("tr[id='"+registroId + "'] > #td_acciones > #btnEditar")
    const btnAceptar = document.createElement("button")
    const registro = banco.buscarCaja(cajaId).getRegistro(registroId)

    //Eliminar el boton de editar
    btnEditar.remove()

    //Crear boton aceptar
    btnAceptar.innerHTML = "Aceptar"
    btnAceptar.addEventListener("click", () => editarRegistro(cajaId, registroId))
    tdAcciones.appendChild(btnAceptar)

    //Agregar campos
    const inputEditarFecha = document.createElement("input")
    const inputEditarConcepto = document.createElement("select")
    const inputEditarCuantia = document.createElement("input")

    inputEditarFecha.id = "inputEditarFecha"
    inputEditarConcepto.id = "inputEditarConcepto"
    inputEditarCuantia.id = "inputEditarCuantia"

    inputEditarFecha.type = "date"
    inputEditarCuantia.type = "number"

    inputEditarFecha.value = registro.getFecha()
    inputEditarCuantia.value = registro.getCuantia()

    inputEditarFecha.placeholder = "Nueva fecha"
    inputEditarCuantia.placeholder = "Nueva cuantía"

    //Rellenar conceptos
    conceptos.forEach(conceptoActual => {
        const optionConcepto = document.createElement("option")
        optionConcepto.value = conceptoActual.getId()
        optionConcepto.innerHTML = conceptoActual.getNombre()

        //Comprobar si el concepto actual es el mismo que el del registro a editar
        if (conceptoActual.getId() == registro.getConcepto().getId()) {
            optionConcepto.selected = true
        }

        inputEditarConcepto.appendChild(optionConcepto)
    })

    //Sustituir las columnas por los campos
    tdFecha.innerHTML = ""
    tdCuantia.innerHTML = ""
    tdConcepto.innerHTML = ""

    tdFecha.appendChild(inputEditarFecha)
    tdCuantia.appendChild(inputEditarCuantia)
    tdConcepto.appendChild(inputEditarConcepto)
}

function editarRegistro(cajaId, registroId) {
    //Validar que los campos son correctos
    const validacion = validarEditarRegistro()
    if (validacion !== true) {
        alert(validacion)
        return false
    }

    const inputEditarFecha = document.getElementById("inputEditarFecha")
    const inputEditarConcepto = document.getElementById("inputEditarConcepto")
    const inputEditarCuantia = document.getElementById("inputEditarCuantia")

    //Guardar los nuevos valores
    let valores = {}

    valores.cuantia = inputEditarCuantia.value
    valores.fecha = inputEditarFecha.value
    valores.concepto = conceptos.find(concepto => concepto.getId() == inputEditarConcepto.options[inputEditarConcepto.selectedIndex].value)

    //Editar registro
    banco.editarRegistro(cajaId, registroId, valores)

    cargarTablaFiltro()
}

function validarEditarRegistro() {
    const fecha = new Date(document.getElementById("inputEditarFecha").value)
    const fechaActual = new Date()
    
    if (isNaN(Number(fecha.getTime()))) {
        return "Fecha inválida"
    }
    if (fechaActual.getTime() < fecha.getTime()) {
        return "La fecha no puede ser posterior a la actual"
    }

    //Cuantia
    const cuantia = document.getElementById("inputEditarCuantia").value
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