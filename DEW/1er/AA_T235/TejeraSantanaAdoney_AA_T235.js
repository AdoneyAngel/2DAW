var Categorias;
(function (Categorias) {
    Categorias[Categorias["electronica"] = 0] = "electronica";
    Categorias[Categorias["ropa"] = 1] = "ropa";
    Categorias[Categorias["alimento"] = 2] = "alimento";
})(Categorias || (Categorias = {}));
var nombrePrompt = prompt("Nombre producto");
var precioPrompt = prompt("Precio del producto");
var descuentoPrompt = confirm("¿Tiene descuento?");
var categoriaPrompt = prompt("Categoria (electronica, ropa o alimento)");
var nombre = nombrePrompt !== null ? nombrePrompt : "";
var precio = precioPrompt !== null ? parseInt(precioPrompt) : 0;
var descuento = descuentoPrompt !== null ? descuentoPrompt : false;
var categoria;
//Se valida el precio
if (isNaN(precio)) {
    precio = 0;
}
//Se establece la categoria
if (categoriaPrompt !== null) {
    categoriaPrompt = categoriaPrompt.toLowerCase();
}
else {
    alert("Falta la categoria o categoría inválida");
}
switch (categoriaPrompt) {
    case "electronica":
        categoria = Categorias.electronica;
        break;
    case "ropa":
        categoria = Categorias.ropa;
        break;
    case "alimento":
        categoria = Categorias.alimento;
        break;
    default:
        alert("No ha insertado la categoría o es inválida");
        break;
}
//Configuración de precios
if (descuento) {
    precio = precio * 0.9;
}
//Descuento dependiendo de la categoria
switch (categoria) {
    case Categorias.electronica:
        precio = precio * 1.2;
        break;
    case Categorias.ropa:
        precio = precio * 1.1;
        break;
    case Categorias.alimento:
        precio = precio;
        break;
    default:
        alert("Categoria inválida");
}
alert("Producto: " + nombre + "Precio final: " + precio + "€");
