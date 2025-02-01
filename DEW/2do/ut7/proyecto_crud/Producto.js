class Producto {
    id
    title
    description
    category
    price

    constructor(id, title, description, category, price) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.category = category
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