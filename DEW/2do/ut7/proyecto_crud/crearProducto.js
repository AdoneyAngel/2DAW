const crear_title = document.getElementById("crear_title")
const crear_description = document.getElementById("crear_description")
const crear_price = document.getElementById("crear_price")
const crear_category = document.getElementById("crear_category")
const crearBox = document.getElementById("crearBox")
const notificacionBox = document.getElementById("notificacion")
const notificacionErrorBox = document.getElementById("notificacion_error")






let productosCargados = []
let categoriasCargadas = []
let carritoCargado = []
let max_price = 1000
let pagina = 0
let nProductosPagina = 10
let cargandoPagina = false
let filtrando = false






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

function volver() {
    window.location = "index.html"
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

        crear_category.appendChild(optionCategoria.cloneNode(true))
    })
}






descargarProductos(0).then(async productos => {//Descargar los productos y carrito y posteriormente cargar la tabla
    productosCargados = productos

    //cargarProductosCarrito()
    //cargarTabla(productos)
})
descargarCategorias().then(categorias => {
    cargarCategorias(categorias)
})