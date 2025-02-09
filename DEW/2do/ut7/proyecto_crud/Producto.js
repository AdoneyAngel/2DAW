class Producto {
    id
    title
    description
    category
    price
    stock
    enCarrito

    constructor(id, title, description, category, price, stock, enCarrito = 0) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.category = category
        this.stock = stock
        this.enCarrito = enCarrito
    }
    getId() {
        return this.id
    }
    getTitle() {
        return this.title
    }
    getDescription() {
        return this.description
    }
    getPrice() {
        return this.price
    }
    getCategory() {
        return this.category
    }
    getStock() {
        return this.stock
    }
    setStock(stock) {
        this.stock = stock
    }
    getEnCarrito() {
        return this.enCarrito
    }
    setEnCarrito(unidades) {
        this.enCarrito = unidades
    } 

    getURLSearchParams() {
        return new URLSearchParams({
            id: this.id,
            title: this.title,
            description: this.description,
            category: this.category.getName(),
            price: this.price
        })
    }

}