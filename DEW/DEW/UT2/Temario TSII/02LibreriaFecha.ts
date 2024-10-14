import { format, addDays ,differenceInDays  } from 'date-fns';

//npm install date-fns


// Obtener la fecha actual formateada
const fechaActual: Date = new Date();
const fechaFormateada: string = format(fechaActual, 'dd/MM/yyyy');

console.log("Fecha formateada con date-fns:", fechaFormateada);

// Sumar 5 días a la fecha actual
const nuevaFecha: Date = addDays(fechaActual, 5);
console.log("Fecha actual + 5 días:", format(nuevaFecha, 'dd/MM/yyyy'));

// Calcular la diferencia en días entre dos fechas

const diferencia: number = differenceInDays(nuevaFecha, fechaActual);
console.log(`Diferencia en días entre ${format(nuevaFecha, 'dd/MM/yyyy')} y ${format(fechaActual, 'dd/MM/yyyy')}: ${diferencia} días`);


//RECUERDEN 
//Compilar el proyecto  npx  tsc -p .  
//Compilar poryecto tsc -p  .
//Compilar un fichero tsc 01ejemplo.ts

//EJECUTA  node 02LibreriaFecha.js