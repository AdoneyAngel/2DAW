// Simulamos una carga de datos asíncrona con setTimeout
setTimeout(() => {
    document.getElementById("message").innerText = "¡El script ha sido cargado y ejecutado!";
}, 2000); // Cambia el texto después de 2 segundos