//Variables
const tabla = document.getElementById("lista")
const tbody = document.getElementById("tbody")
const crear_title = document.getElementById("crear_title")
const crear_description = document.getElementById("crear_description")
const crear_price = document.getElementById("crear_price")
const editarBox = document.getElementById("editarBox")
const loadingBackground = document.getElementById("loadingBackground")
const notificacionBox = document.getElementById("notificacion")
const notificacionErrorBox = document.getElementById("notificacion_error")

let productosCargados = []







//Métodos
async function descargarProductos() {

    return fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(productos => {
        
        productosCargados = productos.products.map(productoActual => {
            const productoClass = new Producto(productoActual.id, productoActual.title, productoActual.description, productoActual.price)
            
            return productoClass
        })

        return true
    })
}

function cargarTabla() {
    vaciarTabla()

    productosCargados.forEach(producto => {
        añadirProductoTabla(producto)
    })
}

function vaciarTabla() {
    const registrosTabla = document.querySelectorAll("#lista > tbody > tr")

    registrosTabla.forEach(registro => registro.remove())
}

function añadirProductoTabla(producto) {
    const tr = document.createElement("tr")
    const td = document.createElement("td")
    const btnEliminar = document.createElement("button")
    const btnEditar = document.createElement("button")

    btnEliminar.addEventListener("click", () => eliminarProducto(producto.getId()))
    btnEliminar.textContent = "Eliminar"
    btnEliminar.id = "btnEliminar_tabla"

    btnEditar.addEventListener("click", () => mostrarEditarProducto(producto))
    btnEditar.textContent = "Editar"
    btnEditar.id = "btnEditar_tabla"

    td.innerHTML = producto.getId()
    tr.appendChild(td.cloneNode(true))

    td.innerHTML = producto.getTitle()
    tr.appendChild(td.cloneNode(true))

    td.innerHTML = producto.getDescription()
    tr.appendChild(td.cloneNode(true))

    td.innerHTML = producto.getPrice() + "€"
    tr.appendChild(td.cloneNode(true))

    td.innerHTML = ""
    td.appendChild(btnEliminar)
    td.appendChild(btnEditar)
    tr.appendChild(td)

    tbody.appendChild(tr)
}

function eliminarProducto(productoId) {
    productosCargados = productosCargados.filter(producto => producto.getId() != productoId)

    cargarTabla()
}

async function crearProducto() {
    const validar = validarCrear()

    if (validar) {//Si la validación retorna algun error, da una alerta y para
        mostrarError(validar)
        return false
    }

    nuevoProducto = new Producto(-1, crear_title.value, crear_description.value, crear_price.value)

    setLoading()

    fetch("https://dummyjson.com/products/add", {
        method: "POST",
        body: nuevoProducto.getURLSearchParams()

    }).then(res => res.json())
    .then(result => {
        const productoAñadido = new Producto(
            result.id,
            result.title,
            result.description,
            result.price
        )

        añadirProductoTabla(productoAñadido)

        mostrarMensaje("Producto añadido correctamente")

    })
    .finally(() => {
        crear_title.value = ""
        crear_description.value = ""
        crear_price.value = ""

        unsetLoading()
    })
    
}

function validarCrear() {
    if (crear_title.value.length<1) {
        return "Debe ingresar un título"
    }

    if (crear_description.value.length<1) {
        return "Debe ingresar una descripción"
    }

    if (crear_price.value <= 0) {
        return "Precio del producto inválido"
    }

    return false
}

function mostrarEditarProducto(producto) {
    const inputTitulo = document.getElementById("editar_title")
    const inputDescription = document.getElementById("editar_description")
    const inputPrice = document.getElementById("editar_price")
    const btnEditar = document.getElementById("btn_editar")

    editarBox.style.display = "flex"

    inputTitulo.value = producto.getTitle()
    inputDescription.value = producto.getDescription()
    inputPrice.value = producto.getPrice()

    btnEditar.onclick = () => editarProducto(producto.getId())
}

async function editarProducto(productoId) {
    const inputTitulo = document.getElementById("editar_title")
    const inputDescription = document.getElementById("editar_description")
    const inputPrice = document.getElementById("editar_price")
    const btnEditar = document.getElementById("btn_editar")

    editarBox.style.display = "none"

    setLoading()

    return fetch("https://dummyjson.com/products/"+productoId, {
        method: "PUT",
        body: new URLSearchParams({
            title: inputTitulo.value,
            description: inputDescription.value,
            price: inputPrice.value,
        })

    })
    .then(res => res.json())
    .then(resultado => {
        //Se resetea los campos
        inputTitulo.value = ""
        inputDescription.value = ""
        inputPrice.value = 0
        btnEditar.onclick = null

        const productoResultante = new Producto(productoId, resultado.title, resultado.description, resultado.price)

        //Modificar en la tabla y volver a cargarla
        productosCargados = productosCargados.map(producto => {
            if (producto.getId() == productoId) {
                return productoResultante
            }
            return producto
        })

        cargarTabla()

        mostrarMensaje("Producto modificado exitosamente")
        
    })
    .finally(() => {        
        unsetLoading()

        return true
    })
}

function mostrarMensaje(mensaje) {
    notificacionErrorBox.style.display = "none"

    notificacionBox.innerHTML = mensaje
    notificacionBox.style.display = "block"

    notificacionBox.onclick = () => notificacionBox.style.display = "none"
}
function mostrarError(mensaje) {
    notificacionBox.style.display = "none"

    notificacionErrorBox.innerHTML = mensaje
    notificacionErrorBox.style.display = "block"

    notificacionErrorBox.onclick = () => notificacionErrorBox.style.display = "none"
}

function setLoading() {
    loadingBackground.style.display = "block"
}
function unsetLoading() {
    loadingBackground.style.display = "none"
}







//Métodos iniciales
descargarProductos().then(res => {//Descargar los productos y posteriormente cargar la tabla
    cargarTabla()
})
