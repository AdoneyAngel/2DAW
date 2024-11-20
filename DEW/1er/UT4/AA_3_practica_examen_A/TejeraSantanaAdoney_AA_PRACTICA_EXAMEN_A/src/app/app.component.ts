import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pais } from '../model/pais/pais';
import { Ciudad } from '../model/ciudad/ciudad';
import { Producto } from '../model/producto/producto';
import { Direcciones } from '../model/direcciones/direcciones';
import { Direccion } from '../model/direccion/direccion';
import { Compra } from '../model/compra/compra';
import { HistorialCompras } from '../model/historialCompras/historial-compras';
import { Usuario } from '../model/usuario/usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TejeraSantanaAdoney_AA_PRACTICA_EXAMEN_A';
  usuarios:Usuario[] = []

  ngOnInit() {//Se ejecuta la funcion nada mas comenzar
    this.flujo()
  }

  flujo() {
    const numUsuarios = 3

    //---------Se crea las ubicaciones iniciales
    //Paises y ciudades
    const ciudadMadrid = new Ciudad("Madrid")
    const ciudadBarcelona = new Ciudad("Barcelona")
    const ciudadValencia = new Ciudad("Valencia")

    const paisEspaña = new Pais("España", [ciudadMadrid, ciudadBarcelona, ciudadValencia])

    const ciudadFrancia1 = new Ciudad("ciudadFrancia1")
    const ciudadFrancia2 = new Ciudad("ciudadFrancia2")
    const ciudadFrancia3 = new Ciudad("ciudadFrancia3")

    const paisFrancia = new Pais("Francia", [ciudadFrancia1, ciudadFrancia2, ciudadFrancia3])

    const ciudadAlemania1 = new Ciudad("CiudadAlemania1")
    const ciudadAlemania2 = new Ciudad("CiudadAlemania2")
    const ciudadAlemania3 = new Ciudad("CiudadAlemania3")

    const paisAlemania = new Pais("Alemania", [ciudadAlemania1, ciudadAlemania2, ciudadAlemania3])

    const ubicaciones = [paisEspaña, paisFrancia, paisAlemania]

    //---------Se crea los productos iniciales
    const productoPapas = new Producto("Papas", 2)
    const productoRefresco = new Producto("CocaCola", 1.7)
    const productoTV = new Producto("TV", 700)
    const productoMartin = new Producto("Aston Martin", 700)

    //---------Estados validos para producto
    const estadosProducto = ["Pendiente", "En Proceso", "Completado"]

    const productos = [productoPapas, productoRefresco, productoTV, productoMartin]

    //---------Variables constantes para aleatoriedad de los usuarios
    const diasRestarNacimiento = (365*65)
    const diasRestarCompra = 30
    const maxDirecciones = 3
    const minDirecciones = 1
    const minCompras = 0
    const maxCompras = 4
    const fechaReal = new Date();

    //---------Generar usuarios
    for(let IdUsuario = 0; IdUsuario<numUsuarios; IdUsuario++) {
      const nombreUsuario = "Usuario "+IdUsuario
      let fechaNacimiento = new Date()
      fechaNacimiento.setDate(fechaNacimiento.getDate()-(Math.random()*diasRestarNacimiento))

      let direcciones = new Direcciones([]);

      //Generar direcciones
      const nDirecciones = Math.random()*(maxDirecciones-minDirecciones)+minDirecciones
      for(let index = 0; index<nDirecciones; index++) {
        const paisPosicion = Math.round(Math.random()*ubicaciones.length)
        const paisActual = ubicaciones[paisPosicion]

        let direccionActual = new Direccion(paisActual)//El modelo, si no se le pasa la ciudad, elige una aleatoria del pais

        direcciones.añadirDireccion(direccionActual)//Se añade a "direcciones" la direccion actual
      }

      //Se establece la direccion elegida como principal
      const direccionElegidaPos = Math.round(Math.random()*direcciones.getDirecciones().length)
      const direccionElegida = direcciones.getDirecciones()[direccionElegidaPos]

      direcciones.setDireccionElegida(direccionElegida)

      //Generar historial de compras
      const historialCompras = new HistorialCompras([])
      const nCompras = Math.random()*(maxCompras-minCompras)+minCompras

      for (let compraIndex = 0; compraIndex<nCompras; compraIndex++) {
        const productoPos = Math.round(Math.random()*productos.length)
        const estadoPos = Math.round(Math.random()*estadosProducto.length)

        const productoActual = productos[productoPos]
        const estadoProducto = estadosProducto[estadoPos]

        let fechaCompra = new Date()
        fechaCompra.setDate(fechaCompra.getDate()-diasRestarCompra)

        const compraActual = new Compra(productoActual, fechaCompra, estadoProducto)

        historialCompras.añadirCompra(compraActual)

      }

      //Calcular edad y descuento
      const edad = (fechaReal.getTime()-fechaNacimiento.getTime())/(1000*60*60*24*365)

      let descuento = 0

      if (edad <= 12) {
        descuento = .5

      } else if (edad > 12 && edad <= 18){
        descuento = .2

      } else if (edad >= 60) {
        descuento = .3
      }

      if (fechaNacimiento.getDate() == fechaReal.getDate() && fechaNacimiento.getMonth() == fechaReal.getMonth()) {
        descuento += .1
      }

      //Se establece el descuento
      historialCompras.establecerDescuento(descuento)//El modelo, con esta funcion, establece el descuento y el precio final de cada producto

      //Crear el usuario
      const usuarioActual = new Usuario(IdUsuario, nombreUsuario, fechaNacimiento, direcciones, historialCompras)

      this.usuarios.push(usuarioActual)
    }

    console.log(this.usuarios)
  }
}
