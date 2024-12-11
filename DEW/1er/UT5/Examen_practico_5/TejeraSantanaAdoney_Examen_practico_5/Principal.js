const registro = new Registro()


//Elementos
const generosEl = document.getElementById("genero")
const isbnEl = document.getElementById("isbn")
const tituloEl = document.getElementById("titulo")
const fechaEl = document.getElementById("fecha")
const blackfridayEl = document.getElementById("blackfriday")
const autorEl = document.getElementById("autor")
const precioEl = document.getElementById("precio")
const descuentoEl = document.getElementById("descuento")
const precioFinalEl = document.getElementById("precioFinal")
const submitBtn = document.getElementById("btn")
const formulario = document.getElementById("form")

//Variables estáticas
const genComedia = new Genero(0, "Comedia")
const genFiccion = new Genero(1, "Ficción")
const genTerror = new Genero(2, "Terror")

const generos = [genComedia, genFiccion, genTerror]

//Datos iniciales del formulario
generos.forEach(generoActual => {
    generosEl.options[generosEl.options.length] = new Option(generoActual.getNombre(), generoActual.getId())
})

descuentoEl.options[0] = new Option("10% de Descuento", .1)
descuentoEl.options[1] = new Option("30% de Descuento", .3)
descuentoEl.options[2] = new Option("50% de Descuento", .5)

//Eventos
isbnEl.addEventListener("keyup", event => {
    if (!validarIsbn(event)){
        setError(event.target.id, "El campo no debe estar vacío.")

    } else {
        resetError(event.target.id)
    }
})
tituloEl.addEventListener("keyup", event => {
    if (!validarTitulo(event)){
        setError(event.target.id, "El campo no debe estar vacío.")

    } else {
        resetError(event.target.id)
    }
})
autorEl.addEventListener("keyup", event => {
    if (!validarAutor(event)){
        setError(event.target.id, "El campo no debe estar vacío.")

    } else {
        resetError(event.target.id)
    }
})
blackfridayEl.addEventListener("change", event => {
    establecerDescuento()
})
fechaEl.addEventListener("change", event => {
    if (!validarFecha(event)){
        setError(event.target.id, "Debe ser una fecha válida.")

    } else {
        resetError(event.target.id)
        establecerDescuento()
    }
})
precioEl.addEventListener("keyup", event => {
    if (!validarPrecio(event)){
        setError(event.target.id, "Debe ser un número positivo válido.")

    } else {
        resetError(event.target.id)

    }

    //Establecer precio final
    precioFinalEl.value = calcularPrecioFinal()
})
precioFinalEl.addEventListener("keyup", event => {
    if (!validarPrecioFinal(event)){
        setError(event.target.id, "Éste campo no puede ser modificado.")//Por si acaso

    } else {
        resetError(event.target.id)
    }
})

formulario.addEventListener("submit", e => {
    e.preventDefault()

    registrar()
})

//Ningun campo puede estar vacío
const camposObligatorios = [isbnEl, tituloEl, fechaEl, autorEl, generosEl, precioEl, precioFinalEl]

//Validaciones
function validarVacío(e) {
    const valor = e.value

    if (valor.length <= 0) {
        return false

    } else {
        return true
    }
}

function validarIsbn() {
    const el = isbnEl
    return validarVacío(el)
}
function validarTitulo() {
    const el = tituloEl
    return validarVacío(el)
}
function validarAutor() {
    const el = autorEl
    return validarVacío(el)
}
function validarFecha() {
    const el = fechaEl
    const value = el.value 

    const fecha = new Date(value)

    if (!validarVacío(el)) {
        console.log("fecha")
        return false
    }

    if (!isNaN(Number(fecha.getTime()))) {
        return true

    } else {
        return false
    }
}
function validarPrecio() {
    const el = precioEl
    const value = el.value

    if (!validarVacío(el)) {
        return false
    }

    if (typeof Number(value) != "number") {
        console.log("nu")
        return false

    } else if (value < 0) {
        return false

    } else {
        return true
    }
}
function validarPrecioFinal() {
    const el = precioFinalEl

    if (el.value == calcularPrecioFinal()) {
        return true

    } else {
        return false
    }
    
}

//Funciones a parte
function registrar() {
    //Volver a hacer todas las validaciones
    if (validarAutor() && validarFecha() && validarIsbn() && validarPrecio() && validarPrecioFinal() && validarTitulo()) {
        //Se crea el libro
        const isbn = isbnEl.value
        const titulo = tituloEl.value
        const genero = generos[generosEl.options.selectedIndex]
        const fecha = new Date(fechaEl.value)
        const blackfriday = blackfridayEl.checked
        const autor = new Autor(0, autorEl.value)
        const precio = precioEl.value
        const descuento = descuentoEl.options[descuentoEl.options.selectedIndex].value
        const precioFinal = calcularPrecioFinal()

        const libro = new Libro(isbn, titulo, genero, fecha, blackfriday, autor, precio, descuento, precioFinal)

        registro.addLibro(libro)

        cargarTabla()

        formulario.reset()

    } else {
        alert ("Revise todos los campos.")
    }
}

function cargarTabla() {
    const tbody = document.getElementById("tbody")
    const filas = document.querySelectorAll("#tbody > tr")
    //Vaciar filas

    filas.forEach(fila => fila.remove())

    //Insertar cada libro
    const libros = registro.getLibros()

    libros.forEach(libroActual => {
        const tr = document.createElement("tr")
        const isbn = document.createElement("td")
        const nombre = document.createElement("td")
        const genero = document.createElement("td")
        const descuento = document.createElement("td")
        const precio = document.createElement("td")
        const precioFinal = document.createElement("td")
        const nombreAutor = document.createElement("td")

        isbn.innerHTML = libroActual.getIsbn()
        nombre.innerHTML = libroActual.getTitulo()
        genero.innerHTML = libroActual.getGenero().getNombre()
        descuento.innerHTML = (libroActual.getDescuento()*100)+"%"
        precio.innerHTML = libroActual.getPrecio()+"€"
        precioFinal.innerHTML = libroActual.getPrecioFinal()+"€"
        nombreAutor.innerHTML = libroActual.getAutor().getNombre()

        tr.appendChild(isbn)
        tr.appendChild(nombre)
        tr.appendChild(genero)
        tr.appendChild(precio)
        tr.appendChild(descuento)
        tr.appendChild(precioFinal)
        tr.appendChild(nombreAutor)
        
        tbody.appendChild(tr)
    })
    
}

function establecerDescuento() {
    const fechaActual = new Date()
    const fechaLibro = new Date(fechaEl.value)

    if (blackfridayEl.checked) {
        descuentoEl.options.selectedIndex = 2

    } else if(fechaActual.getDate() == fechaLibro.getDate() && fechaActual.getMonth() == fechaLibro.getMonth()) {
        descuentoEl.options.selectedIndex = 1

    } else {
        //En cualquier caso
        descuentoEl.options.selectedIndex = 0
    }
}

function setError(id, txt) {
    const el = document.getElementById(id)

    el.style.background = "red"
    showError(id, txt)
    
}
function resetError(id) {
    const el = document.getElementById(id)

    el.style.background = "white"
    hiddeError(id)
}
function hiddeErrors(id) {
    const erroresEl = document.querySelectorAll(".error")

    erroresEl.forEach(el => el.style.display = "none")
    
}
function showError(idInput, txt) {
    const errorEl = document.getElementById(idInput+"Error")

    errorEl.style.display = "inline-block"
    errorEl.innerHTML = txt
}
function hiddeError(idInput) {
    const errorEl = document.getElementById(idInput+"Error")

    errorEl.style.display = "none"
}
function calcularPrecioFinal() {
    const precio = precioEl.value
    const descuento = descuentoEl.options[descuentoEl.options.selectedIndex].value

    const precioFinal = precio-(precio*descuento)

    return precioFinal
}

//Acciones al inicio
hiddeErrors()