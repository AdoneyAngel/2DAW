"use strict";
//Tipos primitivos
let mi_numero = 11;
let mi_decimal = 1.54;
let mi_cadena = "Este es un ejemplo de cadena de texto";
let mi_booleano = true;
//Enums (Enumeraciones):
var Dia;
(function (Dia) {
    Dia[Dia["Lunes"] = 0] = "Lunes";
    Dia[Dia["Martes"] = 1] = "Martes";
    Dia[Dia["Miercoles"] = 2] = "Miercoles";
    Dia[Dia["Jueves"] = 3] = "Jueves";
    Dia[Dia["Viernes"] = 4] = "Viernes";
})(Dia || (Dia = {}));
let diaDeTrabajo = Dia.Lunes;
//any permite que una variable pueda contener cualquier tipo de valor.
let variableIndefinida = "Texto";
variableIndefinida = 123; // Cambia a número
/*Union Types:
Permiten que una variable pueda tener más de un tipo.*/
let identificador; // Puede ser un número o un string
identificador = 123;
identificador = "ABC123";
function mover(direccion) {
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
            const check = direccion; // Aquí el tipo never ayuda a detectar errores
            console.error("Dirección desconocida", check);
    }
}
// NEVER Funciones que lanzan errores
function lanzarError(mensaje) {
    throw new Error(mensaje);
}
lanzarError("Esto es un error"); // La ejecución se detiene aquí
////RECUERDEN 
//Compilar el proyecto  npx  tsc -p .  
//Compilar poryecto tsc -p  .
//Compilar un fichero tsc 01ejemplo.ts
//RECUERDEN para minimizar uglifyjs  02_TipoDatos.js -o 02_TipoDatos.min.js
