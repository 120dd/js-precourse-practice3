import {Product} from "./product.js";
import {COINS} from "../constants/constants.js";
import {pickRandomNumInList} from "../utils/utils.js";

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
    
    addMachineCoinRandomly(balance){
        let remainBalance = balance;
        remainBalance = this.repeatAddRandomCoin(remainBalance, COINS.COIN_500, [10,50,100,500]);
        remainBalance = this.repeatAddRandomCoin(remainBalance, COINS.COIN_100, [10,50,100]);
        remainBalance = this.repeatAddRandomCoin(remainBalance, COINS.COIN_50, [10,50]);
        this.repeatAddRandomCoin(remainBalance, COINS.COIN_10, [10]);
    }
    
    repeatAddRandomCoin(remainBalance, coinValue, coinArray){
        while (remainBalance >= coinValue){
            const randomCoinValue = pickRandomNumInList(coinArray);
            this.addMachineCoin(randomCoinValue);
            remainBalance -= randomCoinValue;
        }
        return remainBalance;
    }
    
    addMachineCoin(coinValue){
        const coinIndex = this.machineCoins.findIndex(coin=>coin.value === coinValue);
        this.machineCoins[coinIndex].quantity += 1;
    }
}
