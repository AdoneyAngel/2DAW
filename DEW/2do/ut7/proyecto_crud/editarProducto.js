const editar_title = document.getElementById("editar_title")
const editar_description = document.getElementById("editar_description")
const editar_price = document.getElementById("editar_price")
const editar_category = document.getElementById("editar_category")
const editarBox = document.getElementById("editarBox")
const notificacionBox = document.getElementById("notificacion")
const notificacionErrorBox = document.getElementById("notificacion_error")
const btnEditar = document.getElementById("btn_editar")






let productosCargados = []
let categoriasCargadas = []
let carritoCargado = []
let max_price = 1000
let pagina = 0
let nProductosPagina = 10
let cargandoPagina = false
let filtrando = false
let productoPorEditar = null






async function crearProducto() {
    const validar = validarCrear()

    if (validar) {//Si la validación retorna algun error, da una alerta y para
        mostrarError(validar)
        return false
    }

    const categoriaSeleccionada = crear_category.options[crear_category.selectedIndex].value
    const categoriaClass = new Categoria(categoriaSeleccionada)

    nuevoProducto = new Producto(-1, crear_title.value, crear_description.value, categoriaClass, crear_price.value)

    fetch("https://dummyjson.com/products/add", {
        method: "POST",
        body: nuevoProducto.getURLSearchParams()

    }).then(res => res.json())
    .then(result => {
        const categoriaProducto = new Categoria(result.category)
        const productoAñadido = new Producto(
            result.id,
            result.title,
            result.description,
            categoriaProducto,
            result.price
        )

        //añadirProductoTabla(productoAñadido)

        productosCargados.push(productoAñadido)

        mostrarMensaje("Producto añadido correctamente, en 2s se redireccionará a la página principal")

        ocultarCrearProducto()

        setTimeout(() => {
            window.location = "index.html"
        }, 2000);

    })
    .finally(() => {
        crear_title.value = ""
        crear_description.value = ""
        crear_price.value = ""
    })
    
}

function mostrarCrearProducto() {
    window.location = "crearProducto.html"

    crearBox.style.display = "flex"

    showDarkedWindow(crearBox.id, ocultarCrearProducto)
}
function ocultarCrearProducto() {
    crearBox.style.display = "none"

    //hiddeDarkedWindow(crearBox.id)
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

function buscarProductoTitle(title) {
    const producto = productosCargados.find(productoActual => productoActual.getTitle().toLowerCase() == title.toLowerCase())

    return producto
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

    if (!crear_category.value.length) {
        return "Debe seleccionar una categoría"
    }

    if (buscarProductoTitle(crear_title.value)) {
        return "El producto ya se encuentra registrado"
    }

    return false
}

async function descargarProductos(paginaProductos) {

    return fetch(`https://dummyjson.com/products?limit=${nProductosPagina}&skip=${paginaProductos}`)
    .then(res => res.json())
    .then(productos => {
        
        const productosDescargados = productos.products.map(productoActual => {
            const categoriaProducto = new Categoria(productoActual.category)
            const productoClass = new Producto(productoActual.id, productoActual.title, productoActual.description, categoriaProducto, productoActual.price, productoActual.stock)

            const productoEnCarrito = buscarProductoCarritoCookie(productoClass.getId())

            if (productoEnCarrito) {
                productoClass.setStock(productoClass.getStock()-productoEnCarrito.unidades)
            }

            return productoClass
        })

        return productosDescargados
    })
}

function buscarProductoCarritoCookie(id) {
    let productoEncontrado = null
    const carritoCookie = getCookie("carrito")

    if (!carritoCookie) {
        return null
    }

    const carritoDiv = carritoCookie.split(",")

    carritoDiv.forEach(productoCookie => {
        const productoDiv = productoCookie.split("_")

        const productoId = productoDiv[0]
        const productoUnidades = productoDiv[1]

        if (id == productoId) {
            const productoBasico = {
                id: productoId,
                unidades: productoUnidades
            }
    
            productoEncontrado = productoBasico
        }
    })

    return productoEncontrado
}

function getCookie(nombre) {
    const cookies = document.cookie
    
    const cookiesDiv = cookies.split(";")
    
    let value = null

    cookiesDiv.forEach(cookie => {
        const cookieDiv = cookie.split("=")
        const cookieValue = cookieDiv[1]
        const cookieNombre = cookieDiv[0]

        if (cookieNombre.trim() == nombre) {
            value = cookieValue
        }
    })

    return value
}

async function descargarCategorias() {
    return fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(respuesta => {
        const categorias = respuesta.map(categoria => {
            const categoriaClass = new Categoria(categoria.slug)

            return categoriaClass
        })

        return categorias
    })
}

function cargarCategorias(categorias) {
    categorias.forEach(categoriaActual => {
        const optionCategoria = document.createElement("option")
        
        optionCategoria.value = categoriaActual.getName()
        optionCategoria.textContent = categoriaActual.getName()

        editar_category.appendChild(optionCategoria.cloneNode(true))
    })
}

async function editarProducto(productoId) {

    const validacion = validarEditar(productoId)

    if (!validacion !== true) {
        mostrarError(validacion)
        return false
    }

    return fetch("https://dummyjson.com/products/"+productoId, {
        method: "PUT",
        body: new URLSearchParams({
            title: editar_title.value,
            description: editar_description.value,
            category: editar_category.options[editar_category.selectedIndex].value,
            price: editar_price.value,
        })

    })
    .then(res => res.json())
    .then(resultado => {

        ocultarEditarProducto()

        const categoriaProducto = new Categoria(resultado.category)

        const productoResultante = new Producto(productoId, resultado.title, resultado.description, categoriaProducto, resultado.price, resultado.stock)

        //Modificar en la tabla y volver a cargarla
        productosCargados = productosCargados.map(producto => {
            if (producto.getId() == productoId) {
                return productoResultante
            }
            return producto
        })

        mostrarMensaje("Producto modificado exitosamente, en 2s será redireccionado")

        setTimeout(() => {
            window.location = "index.html"
        }, 2000);
        
    })
    .finally(() => {     

        return true
    })
}

function volver() {
    window.location = "index.html"
}

function ocultarEditarProducto() {
        const btnEditar = document.getElementById("btn_editar")

        //Se resetea los campos
        editarBox.style.display = "none"
        editar_title.value = ""
        editar_description.value = ""
        editar_price.value = 0
        btnEditar.onclick = null
}

function validarEditar(idProductoEditar) {
    if (editar_title.value.length<1) {
        return "Debe ingresar un título"
    }

    if (editar_description.value.length<1) {
        return "Debe ingresar una descripción"
    }

    if (editar_price.value <= 0) {
        return "Precio del producto inválido"
    }

    if (!editar_category.value.length) {
        return "Debe seleccionar una categoría"
    }

    const productoRepetido = buscarProductoTitle(editar_title.value)
    if (productoRepetido && productoRepetido.getId() != idProductoEditar) {
        return "El producto ya se encuentra registrado"
    }

    return false
}

function getCookie(nombre) {
    const cookies = document.cookie
    
    const cookiesDiv = cookies.split(";")
    
    let value = null

    cookiesDiv.forEach(cookie => {
        const cookieDiv = cookie.split("=")
        const cookieValue = cookieDiv[1]
        const cookieNombre = cookieDiv[0]

        if (cookieNombre.trim() == nombre) {
            value = cookieValue
        }
    })

    return value
}

function cargarProductoCookie() {
    const productoCookie = getCookie("editar")

    if (!productoCookie) {
        return null
    }

    const productoCookieDiv = productoCookie.split("_")

    const id = productoCookieDiv[0]
    const title = productoCookieDiv[1]
    const description = productoCookieDiv[2]
    const price = productoCookieDiv[3]
    const category = productoCookieDiv[4]
    const stock = productoCookieDiv[5]

    productoPorEditar = new Producto(id, title, description, category, price, stock)

    editar_title.value = title
    editar_description.value = description
    editar_price.value = price
}






descargarProductos(0).then(async productos => {//Descargar los productos y carrito y posteriormente cargar la tabla
    productosCargados = productos

    //cargarProductosCarrito()
    //cargarTabla(productos)
})
descargarCategorias().then(categorias => {
    cargarCategorias(categorias)
})
cargarProductoCookie()

btnEditar.onclick = () => editarProducto(1)