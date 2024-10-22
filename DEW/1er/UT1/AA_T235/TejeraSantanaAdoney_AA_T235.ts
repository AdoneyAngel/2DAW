enum Categorias{
    electronica,
    ropa,
    alimento
}

let nombrePrompt : string | null = prompt("Nombre producto")
let precioPrompt : string | null = prompt("Precio del producto")
let descuentoPrompt : boolean | null = confirm("¿Tiene descuento?")
let categoriaPrompt : string | null = prompt("Categoria (electronica, ropa o alimento)")

let nombre : string = nombrePrompt !== null ? nombrePrompt : ""
let precio : number = precioPrompt !== null ? parseInt(precioPrompt) : 0
let descuento : boolean = descuentoPrompt !== null ? descuentoPrompt : false
let categoria : Categorias

//Se valida el precio
if (isNaN(precio)) {
    precio = 0
}

//Se establece la categoria
if (categoriaPrompt !== null) {
    categoriaPrompt = categoriaPrompt.toLowerCase()

} else {
    alert("Falta la categoria o categoría inválida")
}

switch(categoriaPrompt) {
    case "electronica":
        categoria = Categorias.electronica
        break

    case "ropa":
        categoria = Categorias.ropa
        break

    case "alimento":
        categoria = Categorias.alimento
        break

    default:
        alert("No ha insertado la categoría o es inválida")
        break
}

//Configuración de precios
if (descuento) {
    precio = precio*0.9
}

//Descuento dependiendo de la categoria
switch(categoria) {
    case Categorias.electronica:
        precio = precio*1.2
        break

    case Categorias.ropa:
        precio = precio*1.1
        break

    case Categorias.alimento:
        precio = precio
        break

    default:
        alert("Categoria inválida")
}

alert("Producto: " + nombre + "Precio final: " + precio + "€")