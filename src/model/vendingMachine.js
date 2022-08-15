import {Product} from "./product.js";
import {COINS} from "../constants/constants.js";
import {getLocalStorage, pickRandomNumInList, setLocalStorage} from "../utils/utils.js";

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
        this.initProduct();
        this.initCoin();
        this.initBalance();
    }

    initProduct() {
        const productDatas = getLocalStorage('productList');
        if (productDatas) {
            productDatas.forEach(productData => {
                this.products.push(new Product(productData.name, Number(productData.quantity),
                                               Number(productData.price)));
            })
        }
    }

    initCoin() {
        if (getLocalStorage('machineCoin')) {
            this.machineCoins = getLocalStorage('machineCoin');
        }
    }

    initBalance() {
        if (getLocalStorage('userBalance')) {
            this.userBalance = getLocalStorage('userBalance');
        }
    }

    addProduct(name, price, quantity) {
        const newProduct = new Product(name, quantity, price);
        this.products.push(newProduct);
        getLocalStorage('productList',this.products)
    }

    addMachineCoinRandomly(balance) {
        let remainBalance = balance;
        remainBalance = this.addRandomCoinList(remainBalance, COINS.COIN_500, [10, 50, 100, 500]);
        remainBalance = this.addRandomCoinList(remainBalance, COINS.COIN_100, [10, 50, 100]);
        remainBalance = this.addRandomCoinList(remainBalance, COINS.COIN_50, [10, 50]);
        this.addRandomCoinList(remainBalance, COINS.COIN_10, [10]);
    }

    addRandomCoinList(remainBalance, coinValue, coinArray) {
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
        setLocalStorage('machineCoin',this.machineCoins)
    }

    chargeUserBalance(balance) {
        this.userBalance += Number(balance);
        setLocalStorage('userBalance',this.userBalance)
    }

    purchaseProduct(index) {
        const newProducts = this.reduceProductQuantity(index,1);
        this.reduceUserBalance(this.products[index].price);
        setLocalStorage('productList',newProducts)
    }

    reduceProductQuantity(index,quantity){
        this.products[index].quantity -= quantity;
        return this.products;
    }

    reduceUserBalance(balance){
        this.userBalance -= balance
        return this.products;
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
        setLocalStorage('userBalance',this.userBalance);
    }

    resetReturnCoins() {
        this.returnCoins = [
            {value: COINS.COIN_500, quantity: 0},
            {value: COINS.COIN_100, quantity: 0},
            {value: COINS.COIN_50, quantity: 0},
            {value: COINS.COIN_10, quantity: 0},
        ];
    }
}
