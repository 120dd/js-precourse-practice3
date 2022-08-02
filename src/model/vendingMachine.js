import {Product} from "./product.js";

export class VendingMachine {
    constructor() {
        this.products = [];
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
