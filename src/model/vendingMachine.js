import {Product} from "./product.js";
import {COINS} from "../constants/constants.js";

export class VendingMachine {
    constructor() {
        this.products = [
            new Product('콜라',1200, 40),
            new Product('사이다',800, 22),
        ];
        this.machineCoins = [
            {value:COINS.COIN_500, quantity:0},
            {value:COINS.COIN_100, quantity:0},
            {value:COINS.COIN_50, quantity:0},
            {value:COINS.COIN_10, quantity:0},
        ];
        this.userBalance = 0;
    }

    addProduct(name, price, quantity){
        const newProduct = new Product(name,price, quantity);
        this.products.push(newProduct);
    }
    
    // addMachineCoin(balance){
    //    
    // }
}
