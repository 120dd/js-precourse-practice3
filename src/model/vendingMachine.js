import {Product} from "./product.js";
import {COINS} from "../constants/constants.js";
import {pickRandomNumInList} from "../utils/utils.js";

export class VendingMachine {
    constructor() {
        this.products = [];
        this.machineCoins = [
            {value: COINS.COIN_500, quantity: 0},
            {value: COINS.COIN_100, quantity: 0},
            {value: COINS.COIN_50, quantity: 0},
            {value: COINS.COIN_10, quantity: 0},
        ];
        this.returnCoins = [
            {value: COINS.COIN_500, quantity: 0},
            {value: COINS.COIN_100, quantity: 0},
            {value: COINS.COIN_50, quantity: 0},
            {value: COINS.COIN_10, quantity: 0},
        ];
        this.userBalance = 0;
        this.productInit();
        this.coinInit();
        this.balanceInit();
    }

    productInit() {
        const productDatas = JSON.parse(localStorage.getItem('productList'));
        if (productDatas) {
            productDatas.forEach(productData => {
                this.products.push(new Product(productData.name, Number(productData.quantity), Number(productData.price)))
            })
        }
    }

    coinInit() {
        if (JSON.parse(localStorage.getItem('machineCoin'))) {
            this.machineCoins = JSON.parse(localStorage.getItem('machineCoin'));
        }
    }

    balanceInit() {
        if (JSON.parse(localStorage.getItem('userBalance'))) {
            this.userBalance = JSON.parse(localStorage.getItem('userBalance'));
        }
    }

    addProduct(name, price, quantity) {
        const newProduct = new Product(name, quantity, price);
        this.products.push(newProduct);
        localStorage.setItem('productList', JSON.stringify(this.products));
    }

    addMachineCoinRandomly(balance) {
        let remainBalance = balance;
        remainBalance = this.repeatAddRandomCoin(remainBalance, COINS.COIN_500, [10, 50, 100, 500]);
        remainBalance = this.repeatAddRandomCoin(remainBalance, COINS.COIN_100, [10, 50, 100]);
        remainBalance = this.repeatAddRandomCoin(remainBalance, COINS.COIN_50, [10, 50]);
        this.repeatAddRandomCoin(remainBalance, COINS.COIN_10, [10]);
    }

    repeatAddRandomCoin(remainBalance, coinValue, coinArray) {
        while (remainBalance >= coinValue) {
            const randomCoinValue = pickRandomNumInList(coinArray);
            this.addMachineCoin(randomCoinValue);
            remainBalance -= randomCoinValue;
        }
        return remainBalance;
    }

    addMachineCoin(coinValue) {
        const coinIndex = this.machineCoins.findIndex(coin => coin.value === coinValue);
        this.machineCoins[coinIndex].quantity += 1;
        localStorage.setItem('machineCoin', JSON.stringify(this.machineCoins));
    }

    chargeUserBalance(balance) {
        this.userBalance += Number(balance);
        localStorage.setItem('userBalance', this.userBalance);
    }

    purchaseProduct(index) {
        this.products[index].quantity -= 1;
        this.userBalance -= this.products[index].price;
        localStorage.setItem('productList', JSON.stringify(this.products));
    }

    returnChargeCoins() {
        this.returnCoins.map((coin, idx) => {
            if (this.userBalance >= coin.value) {
                const expectQuantity = Math.floor(this.userBalance / coin.value);
                const hasQuantity = this.machineCoins[idx].quantity;
                coin.quantity += Math.min(expectQuantity, hasQuantity);
                this.userBalance -= coin.quantity * coin.value;
            }
        });
        this.machineCoins.map((currentCoin, idx) => {
            currentCoin.quantity -= this.returnCoins[idx].quantity;
        })
        localStorage.setItem('userBalance', this.userBalance);
    }

}
