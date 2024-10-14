//any permite que una variable pueda contener cualquier tipo de valor.
let variableIndefinida: any = "Texto";
variableIndefinida = 123;  // Cambia a número


//unknown es un tipo seguro para representar valores desconocidos. Es similar a any, pero con una mayor seguridad de tipos.

/*
¿Por qué usar unknown en lugar de any?
any desactiva el sistema de tipos de TypeScript, permitiendo realizar cualquier operación sobre una variable sin verificaciones de tipo. Esto puede causar errores difíciles de detectar.

unknown, por otro lado, no permite realizar operaciones sobre el valor sin antes verificar su tipo. Esto obliga a ser más cuidadoso y reduce errores en tiempo de ejecución.
*/

//Usando ANY
let valor: any;
valor = 10;
valor = "Hola";

console.log(valor.toUpperCase()); // No da error, pero puede fallar si el valor no es una cadena

//Usando unknown
let valor_unknown: unknown;
valor_unknown = 10;
valor_unknown = "Hola";

// Error de compilación: el tipo 'unknown' no tiene la propiedad 'toUpperCase'
console.log(valor_unknown.toUpperCase()); 


//Usando unknown Correctamente
let valor_unknown_OK: unknown;
valor_unknown_OK = "Hola, TypeScript";

if (typeof valor_unknown_OK === "string") {
    console.log(valor_unknown_OK.toUpperCase());  // Ahora sabemos que es una cadena
} else {
    console.log("No es una cadena");
}