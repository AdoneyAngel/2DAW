"use strict";
// Fecha actual
const fechaActual = new Date();
console.log("Fecha actual:", fechaActual);
// Crear una fecha específica (año, mes, día)
const fechaEspecifica = new Date(2024, 0, 1); // 1 de enero de 2024
console.log("Fecha específica:", fechaEspecifica);
// Crear una fecha a partir de una cadena
const fechaDesdeCadena = new Date("2024-12-25");
console.log("Fecha desde cadena:", fechaDesdeCadena);
const anio = fechaActual.getFullYear();
const mes = fechaActual.getMonth() + 1; // Los meses son indexados desde 0
const dia = fechaActual.getDate();
console.log(`Año: ${anio}, Mes: ${mes}, Día: ${dia}`);
//RECUERDEN 
//Compilar el proyecto  npx  tsc -p .  
//Compilar poryecto tsc -p  .
//Compilar un fichero tsc 01ejemplo.ts
