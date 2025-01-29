class Producto {
    id
    title
    description
    price

    constructor(id, title, description, price) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
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

    getURLSearchParams() {
        return new URLSearchParams({
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price
        })
    }

}