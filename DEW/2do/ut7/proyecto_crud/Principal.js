//Variables
const tabla = document.getElementById("lista")
const tbody = document.getElementById("tbody")
const crear_title = document.getElementById("crear_title")
const crear_description = document.getElementById("crear_description")
const crear_price = document.getElementById("crear_price")
const crear_category = document.getElementById("crear_category")
const editar_title = document.getElementById("editar_title")
const editar_description = document.getElementById("editar_description")
const editar_price = document.getElementById("editar_price")
const editar_category = document.getElementById("editar_category")
const editarBox = document.getElementById("editarBox")
const loadingBackground = document.getElementById("loadingBackground")
const notificacionBox = document.getElementById("notificacion")
const notificacionErrorBox = document.getElementById("notificacion_error")
const filtrar_name = document.getElementById("filtrar_nombre")
const filtrar_category = document.getElementById("filtrar_category")
const filtrar_min_price = document.getElementById("filtrar_min_price")
const filtrar_max_price = document.getElementById("filtrar_max_price")

let productosCargados = []
let categoriasCargadas = []
let max_price = 1000
let pagina = 0
let cargandoPagina = false



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
async function descargarProductos(pagina) {

    return fetch("https://dummyjson.com/products?limit=10&skip="+pagina)
    .then(res => res.json())
    .then(productos => {

        let newMax_price = 0
        
        productosCargados = productos.products.map(productoActual => {
            const categoriaProducto = new Categoria(productoActual.category)
            const productoClass = new Producto(productoActual.id, productoActual.title, productoActual.description, categoriaProducto, productoActual.price)
            
            if (productoActual.price > newMax_price) {
                newMax_price = productoActual.price
            }

            return productoClass
        })

        max_price = newMax_price

        filtrar_min_price.value = 0
        filtrar_max_price.value = max_price

        return productosCargados
    })
}

async function cargarSiguientePagina() {
    pagina++

    return descargarProductos(pagina).then(productos => {
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

function añadirProductoTabla(producto) {
    const tr = document.createElement("tr")
    const td = document.createElement("td")
    const btnEliminar = document.createElement("button")
    const btnEditar = document.createElement("button")
    const btnAñadir = document.createElement("button")

    btnAñadir.textContent = "Añadir al carrito"
    btnAñadir.id = "btnAñadir_tabla"

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

    td.innerHTML = producto.getCategory().getName()
    tr.appendChild(td.cloneNode(true))

    td.innerHTML = producto.getPrice() + "€"
    tr.appendChild(td.cloneNode(true))

    td.innerHTML = 0
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
}

async function crearProducto() {
    const validar = validarCrear()

    if (validar) {//Si la validación retorna algun error, da una alerta y para
        mostrarError(validar)
        return false
    }

    const categoriaSeleccionada = crear_category.options[crear_category.selectedIndex].value
    const categoriaClass = new Categoria(categoriaSeleccionada)

    nuevoProducto = new Producto(-1, crear_title.value, crear_description.value, categoriaClass, crear_price.value)

    setLoading()

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

        añadirProductoTabla(productoAñadido)

        productosCargados.push(productoAñadido)

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

    if (!crear_category.value.length) {
        return "Debe seleccionar una categoría"
    }

    return false
}

function mostrarEditarProducto(producto) {
    const btnEditar = document.getElementById("btn_editar")

    editarBox.style.display = "flex"

    editar_title.value = producto.getTitle()
    editar_description.value = producto.getDescription()
    editar_price.value = producto.getPrice()

    //Establecer la categoría seleccionado
    for (let optIndex = 0; optIndex<editar_category.options.length; optIndex++) {
        const optActual = editar_category.options[optIndex]
        if (optActual.value == producto.getCategory().getName()) {
            optActual.selected = true

        } else {
            optActual.selected = false
        } 
    }

    btnEditar.onclick = () => editarProducto(producto.getId())
}

async function editarProducto(productoId) {
    const btnEditar = document.getElementById("btn_editar")

    editarBox.style.display = "none"

    setLoading()

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
        //Se resetea los campos
        editar_title.value = ""
        editar_description.value = ""
        editar_price.value = 0
        btnEditar.onclick = null

        const categoriaProducto = new Categoria(resultado.category)

        const productoResultante = new Producto(productoId, resultado.title, resultado.description, categoriaProducto, resultado.price)

        //Modificar en la tabla y volver a cargarla
        productosCargados = productosCargados.map(producto => {
            if (producto.getId() == productoId) {
                return productoResultante
            }
            return producto
        })

        cargarTabla(productosCargados)

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

function filtrarTabla() {
    let productosFiltrados = [...productosCargados]

    //nombre
    if (filtrar_name.value.length) {
        productosFiltrados = productosFiltrados.filter(productoActual => productoActual.getTitle().slice(0, filtrar_name.value.length).toLowerCase() == filtrar_name.value.toLowerCase())

        filtrar_name.value = ""
    }

    //categoria
    const categoriaSeleccionada = filtrar_category.options[filtrar_category.selectedIndex].value
    
    if (categoriaSeleccionada.length) {
        productosFiltrados = productosFiltrados.filter(productoActual => productoActual.getCategory().getName() == categoriaSeleccionada)
    }

    //precio
    productosFiltrados = productosFiltrados.filter(productoActual => productoActual.getPrice() >= filtrar_min_price.value && productoActual.getPrice() <= filtrar_max_price.value)

    filtrar_min_price.value = 0
    filtrar_max_price.value = max_price

    cargarTabla(productosFiltrados)
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
        editar_category.appendChild(optionCategoria.cloneNode(true))
        filtrar_category.appendChild(optionCategoria.cloneNode(true))
    })
}

function añadirCookie(nombre, valor) {
    document.cookie = "nombre=valor; path=/; max-age=3600";
    console.log(document.cookie)
}

añadirCookie("pr", "1111")




//Métodos iniciales
descargarProductos(0).then(productos => {//Descargar los productos y posteriormente cargar la tabla
    cargarTabla(productos)
})
descargarCategorias().then(categorias => {
    cargarCategorias(categorias)
})