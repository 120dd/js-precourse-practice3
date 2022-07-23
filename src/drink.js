export class Drink {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    increaseQuantity(){
        this.quantity += 1;
    }

    decreaseQuantity(){
        if (this.quantity > 0) {
            this.quantity -= 1;
        }
    }
}