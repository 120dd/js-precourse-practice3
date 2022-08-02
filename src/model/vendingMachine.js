import {Product} from "./product.js";

export class VendingMachine {
    constructor() {
        this.products = [
            new Product('콜라',1200, 40),
            new Product('사이다',800, 22),
        ];
        this.machinWallet = [];
        this.userBalance = 0;
    }

    createProduct(name, price, quantity){
        return new Product(name,price, quantity);
    }

    addProduct(name, price, quantity){
        const newProduct = this.createProduct(name, price, quantity);
        this.products.push(newProduct);
    }
}
