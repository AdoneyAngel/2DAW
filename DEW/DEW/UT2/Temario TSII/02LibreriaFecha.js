"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
//npm install date-fns
// Obtener la fecha actual formateada
const fechaActual = new Date();
const fechaFormateada = (0, date_fns_1.format)(fechaActual, 'dd/MM/yyyy');
console.log("Fecha formateada con date-fns:", fechaFormateada);
// Sumar 5 días a la fecha actual
const nuevaFecha = (0, date_fns_1.addDays)(fechaActual, 5);
console.log("Fecha actual + 5 días:", (0, date_fns_1.format)(nuevaFecha, 'dd/MM/yyyy'));
// Calcular la diferencia en días entre dos fechas
const diferencia = (0, date_fns_1.differenceInDays)(nuevaFecha, fechaActual);
console.log(`Diferencia en días entre ${(0, date_fns_1.format)(nuevaFecha, 'dd/MM/yyyy')} y ${(0, date_fns_1.format)(fechaActual, 'dd/MM/yyyy')}: ${diferencia} días`);
//RECUERDEN 
//Compilar el proyecto  npx  tsc -p .  
//Compilar poryecto tsc -p  .
//Compilar un fichero tsc 01ejemplo.ts
//EJECUTA  node 02LibreriaFecha.js
