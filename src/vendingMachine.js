import {Beverage} from "./beverage.js";
import {CHANGE_COINS} from "./constants.js";
import {Ui} from "./ui.js";

const ui = new Ui();

export class VendingMachine {
    constructor() {
        this.beverage = [];
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

    addBeverage(name, price, quantity) {
        const newDrink = new Beverage(name, price, quantity);
        this.beverage.push(newDrink);
    }

    /**
     * 충전할 금액을 받아서 종류별 동전 개수를 충전
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
        const index = this.findIndexByName(beverageName, this.beverage);
        const targetBeverage = this.beverage[index];
        if (this.balance < targetBeverage.price ) {
            ui.showAlert('잔액이 부족합니다');
            return
        }
        if (targetBeverage.quantity < 1) {
            ui.showAlert('품절입니다');
            return
        }
        this.balance -= targetBeverage.price;
        targetBeverage.quantity--;
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
}
