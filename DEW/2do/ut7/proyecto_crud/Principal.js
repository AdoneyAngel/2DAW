//Variables
const tabla = document.getElementById("lista")
const tbody = document.getElementById("tbody")
const tbodyCarrito = document.getElementById("tbodyCarrito")
const loadingBackground = document.getElementById("loadingBackground")
const notificacionBox = document.getElementById("notificacion")
const notificacionErrorBox = document.getElementById("notificacion_error")
const filtroBox = document.getElementById("filtroBox")
const filtrar_name = document.getElementById("filtrar_nombre")
const filtrar_category = document.getElementById("filtrar_category")
const filtrar_min_price = document.getElementById("filtrar_min_price")
const filtrar_max_price = document.getElementById("filtrar_max_price")
const darkBackground = document.getElementById("darkBackground")
const floatingInput = document.getElementById("floatingInput")
const carritoView = document.getElementById("carritoView")
const confirmBox = document.getElementById("confirm")
const confirmBtnConfirmar = document.getElementById("confirm-confirmar")
const confirmBtnCancelar = document.getElementById("confirm-cancelar")
const confirmTitle = document.getElementById("confirm-title")

let productosCargados = []
let categoriasCargadas = []
let carritoCargado = []
let max_price = 1000
let pagina = 0
let nProductosPagina = 10
let cargandoPagina = false
let filtrando = false



document.addEventListener("scroll", () => {//Detectar el scroll de la pagina
    const recorrido = window.scrollY
    const tamañoContenedor = document.body.offsetHeight - window.innerHeight

    const porcentajeScroll = (recorrido/tamañoContenedor)*100;
    
    if (porcentajeScroll >= 90 && !cargandoPagina) {
        cargandoPagina = true

        cargarSiguientePagina().then(res => {
            cargandoPagina = false
        })
    }
})



//Métodos
function setFiltrando() {
    filtrando = true
    filtroBox.className = "formulario filtrando"
}
function unsetFiltrando() {
    filtrando = false
    filtroBox.className = "formulario"

    cargarTabla(productosCargados)
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

async function cargarSiguientePagina() {
    pagina += nProductosPagina

    return descargarProductos(pagina).then(productos => {
        productosCargados = [...productosCargados, ...productos]
        productos.forEach(productoActual => añadirProductoTabla(productoActual))

        return true
    })

}

function cargarTabla(productos) {
    vaciarTabla()

    productos.forEach(producto => {
        añadirProductoTabla(producto)
    })
}

function vaciarTabla() {
    const registrosTabla = document.querySelectorAll("#lista > tbody > tr")

    registrosTabla.forEach(registro => registro.remove())
}

async function añadirProductoTabla(producto) {
    const tr = document.createElement("tr")
    const td = document.createElement("td")
    const btnEliminar = document.createElement("button")
    const btnEditar = document.createElement("button")
    const btnAñadir = document.createElement("button")

    if (filtrando) {//Si esta en estado de filtrado, insertara solo los productos que cumplan con dicho filtro
        if (!cumpleFiltro(producto)) {
            return false
        }
    }

    const productoEnCookie = await buscarProductoCarrito(producto.getId())

    if (productoEnCookie) {//Si el producto se encuentra en el carrito, se carga
        producto = productoEnCookie
    }

    btnAñadir.textContent = "Añadir al carrito"
    btnAñadir.id = "btnAñadir_tabla"
    btnAñadir.addEventListener("click", () => {
        showFloatingInput("Agregar al carrito", "number", (unidades) => guardarProductoCarrito(producto.id, unidades))
    })

    btnEliminar.addEventListener("click", () => {//Preguntar si realmente desea eliminar el producto
        showConfirm("¿Seguro desea eliminar el producto?", () => eliminarProducto(producto.getId()))
    })

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

    td.innerHTML = producto.getCategory().getName()
    tr.appendChild(td.cloneNode(true))

    td.innerHTML = producto.getPrice() + "€"
    tr.appendChild(td.cloneNode(true))
    
    td.innerHTML = producto.getStock() + " unidades"
    tr.appendChild(td.cloneNode(true))

    td.innerHTML = producto.getEnCarrito()
    tr.appendChild(td.cloneNode(true))

    td.innerHTML = ""

    td.appendChild(btnAñadir)
    td.appendChild(btnEditar)
    td.appendChild(btnEliminar)

    tr.appendChild(td)

    tbody.appendChild(tr)
}

function eliminarProducto(productoId) {
    productosCargados = productosCargados.filter(producto => producto.getId() != productoId)

    cargarTabla(productosCargados)
    cargarProductosCarrito()

    mostrarMensaje("Producto eliminado con éxito")
}

function mostrarEditarProducto(producto) {
    //Generar cookie para la otra página
    const editarCookieString = genEditarCookie(producto)
    añadirCookie("editar", editarCookieString)

    window.location = "editarProducto.html"
}

function genEditarCookie(producto) {
    string = `${producto.getId()}_${producto.getTitle()}_${producto.getDescription()}_${producto.getPrice()}_${producto.getCategory()}_${producto.getStock()}`

    return string
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

function filtrarTabla() {
    setFiltrando()

    const productosFiltrados = productosCargados.filter(productoActual => cumpleFiltro(productoActual))

    cargarTabla(productosFiltrados)
}

function cumpleFiltro(producto) {
    //Nombre
    if (filtrar_name.value.length) {
        if (producto.getTitle().slice(0, filtrar_name.value.length).toLowerCase() != filtrar_name.value.toLowerCase()) {
            return false
        }
    }

    //categoria
    const categoriaSeleccionada = filtrar_category.options[filtrar_category.selectedIndex].value
    if (categoriaSeleccionada.length) {
        if (producto.getCategory().getName() != categoriaSeleccionada) {
            return false
        }
    }

    //Precio 
    if (producto.getPrice() < filtrar_min_price.value || producto.getPrice() > filtrar_max_price.value) {
        return false
    }
    
    return true
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

        filtrar_category.appendChild(optionCategoria.cloneNode(true))
    })
}

function añadirCookie(nombre, valor) {
    document.cookie = nombre+"="+valor+";";
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

async function makeError() {
    await fetch("https://dummyjson.com/products", {
        method: "put",
        body: new URLSearchParams()
    })
    .then(res => res.json())
    .then(respuesta => respuesta)
    .catch(error => {
        mostrarError(`Error: ${error}`)
    })
}

async function buscarProductoCarrito(id) {
    const carrito = await getCarrito()

    if (!carrito) {
        return null
    }

    const producto = buscarProductoCarritoLocal(id)

    return producto
}

function buscarProductoCarritoLocal(id) {
    carritoCargado.forEach(productoActual => {
        if (productoActual.getId() == id) {
            return productoActual
        }
    })

    return null
}

async function getCarrito() {
    let productos = []

    const carritoCookie = getCookie("carrito")

    if (!carritoCookie) {
        return []
    }

    carritoProductosDiv = carritoCookie.split(",")

    await carritoProductosDiv.forEach(async productoCookie => {
        if (productoCookie) {
            const productoDiv = productoCookie.split("_")

            const productoId = productoDiv[0]
            const productoUnidades = Number(productoDiv[1])
            
            let producto = buscarProductoCarritoLocal(productoId)

            if (!producto) {//Si no está en el carrito cargado, se busca entre los productos y la api
                producto = await buscarProducto(productoId)
            }

            if (producto) {
                producto.setEnCarrito(productoUnidades)
    
                productos.push(producto)
            }
        }
    })

    console.log(productos.length)
    console.log("Retornando: " + (new Date()).getMilliseconds())

    carritoCargado = productos

    return productos
}

async function buscarProducto(id) {
    let producto = productosCargados.find(productoActual => productoActual.getId() == id)

    if (!producto) {//Si no lo encuentra de forma local, buscara en la api
        const respuesta = await fetch("https://dummyjson.com/products/"+id)
        const respuestaJson = await respuesta.json()

        const productoApi = new Producto(
            respuestaJson.id, 
            respuestaJson.title, 
            respuestaJson.description,
            respuestaJson.category,
            respuestaJson.price,
            respuestaJson.stock)

        producto = productoApi

        console.log("Buscar api:"+producto.getId() + " " + (new Date()).getMilliseconds())

        return producto
    }

    console.log("Buscar local: " + (new Date()).getMilliseconds())

    return await producto
}

function buscarProductoTitle(title) {
    const producto = productosCargados.find(productoActual => productoActual.getTitle().toLowerCase() == title.toLowerCase())

    return producto
}

async function guardarProductoCarrito(id, unidades = 1) {
    let existeEnCarrito = false
    unidades = Number(unidades)

    if (unidades < 0) {//No puede agregar unidades negativas
        mostrarError("Número de unidades inválido")
        return false
    }

    //Cambiar unidades en la lista local
    carritoCargado.forEach(async productoActual => {
        if(productoActual.id == id) {
            if (productoActual.getStock() >= unidades) {
                productoActual.setStock(productoActual.getStock()-unidades)
                productoActual.setEnCarrito(Number(productoActual.getEnCarrito())+unidades)

                existeEnCarrito = true

            } else {
                existeEnCarrito = true
                mostrarError("No hay unidades suficientes")
            }

        }
    })

    if (!existeEnCarrito) {
        const productoLocal = await buscarProducto(id)

        if (productoLocal.getStock() >= unidades) {
            productoLocal.setStock(productoLocal.getStock()-unidades)
            productoLocal.setEnCarrito(Number(productoLocal.getEnCarrito())+unidades)
    
            carritoCargado.push(productoLocal)

        } else {
            mostrarError("No hay unidades suficientes")
        }
    }

    //Se genera el string del carrito
    const carritoString = genCarritoCookieValue()

    añadirCookie("carrito", carritoString)

    cargarTabla(productosCargados)
    cargarProductosCarrito()
}

function reducirProductoCarrito(id, unidades = 1) {
    unidades = Number(unidades)

    if (unidades < 0) {//No puede reducir unidades negativas
        mostrarError("Número de unidades inválido")
        return false
    }

    carritoCargado.forEach(productoActual => {
        if (productoActual.getId() == id) {
            //Si las undades es mayor o igual a la cantidad en carrito, se boora
            if (unidades >= productoActual.getEnCarrito()) {
                productoActual.setStock(productoActual.getStock()+productoActual.getEnCarrito())
                productoActual.setEnCarrito(0)

            } else {
                productoActual.setStock(productoActual.getStock()+unidades)
                productoActual.setEnCarrito(productoActual.getEnCarrito()-unidades)                
            }
        }

    })

    const carritoString = genCarritoCookieValue()

    añadirCookie("carrito", carritoString)

    cargarTabla(productosCargados)
    cargarProductosCarrito()
}

function descartarProductoCarrito(id) {
    // carritoCargado = carritoCargado.filter(productoActual => productoActual.getId() != id)

    carritoCargado.forEach(productoActual => {
        if (productoActual.getId() == id) {
            
            productoActual.setStock(productoActual.getStock()+productoActual.getEnCarrito())
            productoActual.setEnCarrito(0)
        }
    })

    const carritoString = genCarritoCookieValue()

    añadirCookie("carrito", carritoString)

    cargarTabla(productosCargados)
    cargarProductosCarrito()
}

function genCarritoCookieValue() {
    let cookieValue = ""

    carritoCargado.forEach(productoActual => {
        if (Number(productoActual.getEnCarrito()) > 0) {
            cookieValue += `${productoActual.getId()}_${productoActual.getEnCarrito()},`
        }
    })

    return cookieValue
}

async function cargarProductosCarrito() {
    vaciarProductosCarrito()

    const carrito = await getCarrito()

    console.log("Cargando: " + (new Date()).getMilliseconds())

    if (!carrito || !carrito.length) {
        ocultarCarrito()
        return false
    }

    mostrarCarrito()

    carrito.forEach(producto => {
        const disponible = productoDisponible(producto.getId())

        const tr = document.createElement("tr")
        const td = document.createElement("td")
        const btnAñadir = document.createElement("button")
        const btnReducir = document.createElement("button")
        const btnDescartar = document.createElement("button")//boton para borrar todas las unidades de un producto
        const imgDescartar = document.createElement("img")

        if (!disponible) {
            tr.className = "noDisponible"
        }

        btnAñadir.innerHTML = "<p>+</p>"
        
        btnAñadir.onclick = () => {
            showFloatingInput("Agregar al carrito", "number", (unidades) => guardarProductoCarrito(producto.getId(), unidades))
        }

        btnAñadir.className = "btnRounded green"
        
        btnReducir.innerHTML = "<p>-</p>"
        
        btnReducir.onclick = () => {
            showFloatingInput("Quitar del carrito", "number", (unidades) => reducirProductoCarrito(producto.getId(), unidades))
        }

        imgDescartar.src = "https://cdn-icons-png.freepik.com/512/167/167017.png"

        btnDescartar.className = "btn-descartar"
        btnDescartar.appendChild(imgDescartar)
        btnDescartar.onclick = () => showConfirm("¿Seguro desea descartar este producto?", () => {
            descartarProductoCarrito(producto.getId())
        })

        btnReducir.className = "btnRounded red"

        td.innerHTML = producto.getTitle()
        tr.appendChild(td.cloneNode(true))
        
        td.innerHTML = producto.getEnCarrito()
        tr.appendChild(td.cloneNode(true))

        td.innerHTML = (producto.getPrice()*producto.getEnCarrito()).toFixed(2) + "€"
        tr.appendChild(td.cloneNode(true))

        td.innerHTML = ""
        td.appendChild(btnAñadir)
        td.appendChild(btnReducir)
        td.appendChild(btnDescartar)
        tr.appendChild(td)

        tbodyCarrito.appendChild(tr)
    })
}

function productoDisponible(id) {
    productosCargados.forEach(productoActual => {
        if (productoActual.getId() == id) {
            return true
        }
    })
    return false
}

function vaciarProductosCarrito() {
    const filas = document.querySelectorAll("#tbodyCarrito > tr")

    filas.forEach(fila => fila.remove())
}

function actualizarProductosStock() {
    productosCargados.forEach(productoActual => {
        const productoCarrito = buscarProductoCarrito(productoActual.getId())

        if (productoCarrito) {
            productoActual.setStock(productoActual.getStock()-productoCarrito.getEnCarrito())
        }
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

function mostrarCarrito() {
    document.body.style.gridTemplateColumns = "30% 1fr"
    carritoView.style.display = "block"
    
}

function ocultarCarrito() {
    document.body.style.gridTemplateColumns = "1fr"
    carritoView.style.display = "none"
}

function mostrarCrearProducto() {
    window.location = "crearProducto.html"
}

function showFloatingInput(title, inputType, action) {
    const input = document.querySelector("#floatingInput input")
    const inputTitle = document.querySelector("#floatingInput h2")
    const button = document.querySelector("#floatingInput button")

    input.placeholder = title
    input.type = inputType

    inputTitle.innerHTML = title

    button.onclick = () => {
        action(input.value)
        hiddeFloatingInput()
    }

    floatingInput.style.display = "block"

    showDarkedWindow(floatingInput.id, hiddeFloatingInput)
}

function hiddeFloatingInput() {
    const input = document.querySelector("#floatingInput input")
    const inputTitle = document.querySelector("#floatingInput h2")
    const button = document.querySelector("#floatingInput button")

    input.placeholder = ""
    input.type = ""
    input.value = ""

    inputTitle.innerHTML = ""

    button.onclick = "null"

    floatingInput.style.display = "none"

    hiddeDarkedWindow(floatingInput.id)
}

function showDarkedWindow(idBox, close) {
    const box = document.getElementById(idBox)
        
    darkBackground.style.display = "block"
    darkBackground.onclick = () => close()
    box.style.zIndex = 10

}
function hiddeDarkedWindow(idBox) {
    const box = document.getElementById(idBox)
        
    darkBackground.style.display = "none"
    box.style.zIndex = 1

}

function showConfirm(message, action) {//Confirm que cuando se acepta ejecuta la función introducida
    showDarkedWindow(confirmBox.id, ()=>{})
    confirmBox.className = "show"

    confirmBtnConfirmar.onclick = () => {
        hiddeConfirm()
        action()
    }

    confirmBtnCancelar.onclick = () => hiddeConfirm()

    confirmTitle.innerHTML = message
}
function hiddeConfirm() {
    hiddeDarkedWindow(confirmBox.id)
    confirmBtnConfirmar.onclick = null

    confirmBox.className = ""
    confirmTitle.innerHTML = ""
}



//Métodos iniciales
ocultarCarrito()
descargarProductos(0).then(async productos => {//Descargar los productos y carrito y posteriormente cargar la tabla
    productosCargados = productos

    cargarProductosCarrito()
    cargarTabla(productos)
})
descargarCategorias().then(categorias => {
    cargarCategorias(categorias)
})