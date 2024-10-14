//NEVER
// Un uso popular para `never` es asegurarse de que una
// cláusula `switch` sea exhaustiva. Por ejemplo, que todas
// las rutas han sido cubiertas.
type Direccion = "arriba" | "abajo" | "izquierda" | "derecha";

function mover(direccion: Direccion) {
    switch (direccion) {
        case "arriba":
            console.log("Mover hacia arriba");
            break;
        case "abajo":
            console.log("Mover hacia abajo");
            break;
        case "izquierda":
            console.log("Mover hacia la izquierda");
            break;
        case "derecha":
            console.log("Mover hacia la derecha");
            break;
        default:
            const check: never = direccion;  // Aquí el tipo never ayuda a detectar errores
            console.error("Dirección desconocida", check);
    }
}

// NEVER Funciones que lanzan errores
function lanzarError(mensaje: string): never {
    throw new Error(mensaje);
}

lanzarError("Esto es un error"); // La ejecución se detiene aquí
