//Tipos primitivos
let mi_numero: number = 11;
let mi_decimal: number = 1.54;
let mi_cadena: string = "Este es un ejemplo de cadena de texto";
let mi_booleano: boolean = true;

//Enums (Enumeraciones):
enum Dia {
    Lunes,
    Martes,
    Miercoles,
    Jueves,
    Viernes
}
let diaDeTrabajo: Dia = Dia.Lunes;


/*Union Types:
Permiten que una variable pueda tener más de un tipo.*/
let identificador: number | string;  // Puede ser un número o un string
identificador = 123;
identificador = "ABC123";




////RECUERDEN 
//Compilar el proyecto  npx  tsc -p .  
//Compilar poryecto tsc -p  .
//Compilar un fichero tsc 01ejemplo.ts

//RECUERDEN para minimizar uglifyjs  02_TipoDatos.js -o 02_TipoDatos.min.js