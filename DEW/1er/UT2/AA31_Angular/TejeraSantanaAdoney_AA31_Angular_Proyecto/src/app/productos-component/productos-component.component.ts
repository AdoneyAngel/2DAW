import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-productos-component',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './productos-component.component.html',
  styleUrl: './productos-component.component.css'
})
export class ProductosComponentComponent {
  listaCategoriaS = [
    {
      nombre: "electronica",
      productos: [
        "televisor",
        "calculadora"
      ]
    },
    {
      nombre: "mueble",
      productos: [
        "mesa",
        "armario"
      ]
    }
  ]

  categoriaSeleccionada: string|null = null
  productoSeleccionado: string|null = null

  productosCategoria: string[]|null = null

  enviado: boolean = false

  seleccionarCategoria() {
    if (this.categoriaSeleccionada) {
      this.productosCategoria = this.listaCategoriaS.filter(categoria => categoria.nombre === this.categoriaSeleccionada)[0].productos
      this.productoSeleccionado = null
      this.enviado = false
    }
  }

  enviarProducto() {
    if (this.categoriaSeleccionada && this.productoSeleccionado) {
      this.enviado = true

    }
  }
}
