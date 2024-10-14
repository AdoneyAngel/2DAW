let a: number = Number(prompt('dame numero'));
if (!isNaN(a)) {
   
} else {
   
}

//NUMBER

let entrada: string |null = prompt("dame numerito");

let numero: number = entrada !== null ? parseInt(entrada) : NaN;

if (!isNaN(numero)) { }

//BOOLEAN

let strValue: string | null = prompt('dime yes/no');  
let parsedBoolean: boolean = strValue !== null ? 
                                                ( strValue.toLowerCase().trim() === "yes" ? true :false )
                                       : false; 
