import {Product} from "./product.js";
import {CHANGE_COINS} from "./constants.js";

export class VendingMachine {
    constructor() {
        this.product = [];
        this.balance = 0;
        this.changeCoins = [
            {'text': '500원', 'quantity': 0},
            {'text': '100원', 'quantity': 0},
            {'text': '50원', 'quantity': 0},
            {'text': '10원', 'quantity': 0},
        ]
    }

    insertBalance(balance) {
        this.balance += balance;
    }

    addProduct(name, price, quantity) {
        const newDrink = new Product(name, price, quantity);
        this.product.push(newDrink);
    }

    /**
     * 충전할 금액을 받아서 종류별 동전 개수를 랜덤하게 충전
     * @param {number} coins
     */
    chargeChangeCoins(coins) {
        const coinsObj = {coins};
        let leftCoins = {...coinsObj}.coins;
        const coin500 = Math.floor(leftCoins / CHANGE_COINS.COIN_500);
        leftCoins -= coin500 * CHANGE_COINS.COIN_500;
        const coin100 = Math.floor(leftCoins / CHANGE_COINS.COIN_100);
        leftCoins -= coin100 * CHANGE_COINS.COIN_100;
        const coin50 = Math.floor(leftCoins / CHANGE_COINS.COIN_50);
        leftCoins -= coin50 * CHANGE_COINS.COIN_50;
        const coin10 = Math.floor(leftCoins / CHANGE_COINS.COIN_10);
        this.changeCoins[0].quantity += coin500;
        this.changeCoins[1].quantity += coin100;
        this.changeCoins[2].quantity += coin50;
        this.changeCoins[3].quantity += coin10;
    }

    purchaseBeverage(beverageName){
        const index = this.findIndexByName(beverageName, this.product);
        const targetBeverage = this.product[index];
        if (this.balance < targetBeverage.price ) {
            return false;
        }
        if (targetBeverage.quantity < 1) {
            return false;
        }
        this.balance -= targetBeverage.price;
        targetBeverage.quantity--;
        return true;
    }

    /**
     * 대상 객체 배열에서 특정 이름을 가진 객체의 인덱스를 리턴
     * @param name
     * @param target
     * @return {*}
     */
    findIndexByName(name, target){
        return target.findIndex(i=>i.name===name);
    }
    
    
    returnChange(){
        const balanceObj = {coins:this.balance};
        let leftBalance = {...balanceObj}.coins;
        const expect500 = Math.floor(leftBalance / CHANGE_COINS.COIN_500);
        const have500 = this.changeCoins[0].quantity;
        const returned500 = Math.min(expect500, have500);
        leftBalance -= returned500 * CHANGE_COINS.COIN_500;
        const expect100 = Math.floor(leftBalance / CHANGE_COINS.COIN_100);
        const have100 = this.changeCoins[1].quantity;
        const returned100 = Math.min(expect100, have100);
        leftBalance -= returned100 * CHANGE_COINS.COIN_100;
        const expect50 = Math.floor(leftBalance / CHANGE_COINS.COIN_50);
        const have50 = this.changeCoins[2].quantity;
        const returned50 = Math.min(expect50, have50);
        leftBalance -= returned50 * CHANGE_COINS.COIN_50;
        const expect10 = Math.floor(leftBalance / CHANGE_COINS.COIN_10);
        const have10 = this.changeCoins[3].quantity;
        const returned10 = Math.min(expect10, have10);
        leftBalance -= returned10 * CHANGE_COINS.COIN_10;
        this.balance = leftBalance;
        this.changeCoins[0].quantity -= returned500;
        this.changeCoins[1].quantity -= returned100;
        this.changeCoins[2].quantity -= returned50;
        this.changeCoins[3].quantity -= returned10;
        return [returned500,returned100,returned50,returned10];
    }
}
