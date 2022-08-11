import {VendingMachine} from "../model/vendingMachine.js";
import {View} from "../view/view.js";
import {
    verifyBalance,
    verifyProductNameInput,
    verifyProductPriceInput,
    verifyProductQuantityInput, verityEnoughBalance
} from "../utils/verifier.js";

export class Controller {
    constructor() {
        this.init();
    }

    init() {
        this.vendingMachine = new VendingMachine();
        this.view = new View();
        this.initRender();
        this.view.addPurchaseButtonHandler(this.onPurchaseProduct);
        this.view.registerProductAddHandler(this.onAddProduct);
        this.view.registerMachineCoinChargeButtonHandler(this.chargeMachineCoin);
        this.view.registerUserBalanceButtonHandler(this.onChargeUserBalance);
        this.view.registerReturnCoinButtonHandler(this.onReturnCoin);
    }

    initRender() {
        this.view.renderProductList(this.vendingMachine.products);
        this.view.renderPurchaseList(this.vendingMachine.products);
        this.view.renderMachineCoins(this.vendingMachine);
        this.view.renderUserBalance(this.vendingMachine.userBalance);
    }

    onAddProduct = (product) => {
        const verifyResult = [verifyProductNameInput(product.name), verifyProductPriceInput(product.price), verifyProductQuantityInput(product.quantity)];
        const errorIndex = verifyResult.findIndex((result) => result.status === false);
        if (errorIndex !== -1) {
            const errorCode = verifyResult[errorIndex].errorCode;
            this.view.showAlert(errorCode);
            return
        }
        this.vendingMachine.addProduct(product.name, Number(product.price), Number(product.quantity));
        this.view.renderProductList(this.vendingMachine.products);
        this.view.renderPurchaseList(this.vendingMachine.products);
        this.view.addPurchaseButtonHandler(this.onPurchaseProduct);
    }

    onPurchaseProduct = (productIndex) => {
        const verifyResult = verityEnoughBalance(this.vendingMachine.userBalance, this.vendingMachine.products[productIndex].price);
        if (!verifyResult.status) {
            this.view.showAlert(verifyResult.errorCode);
            return
        }
        this.vendingMachine.purchaseProduct(productIndex);
        this.view.renderProductList(this.vendingMachine.products);
        this.view.renderPurchaseList(this.vendingMachine.products);
        this.view.addPurchaseButtonHandler(this.onPurchaseProduct);
        this.view.renderUserBalance(this.vendingMachine.userBalance);
    }
    
    onChargeUserBalance = (balance) =>{
        const verifyResult = verifyBalance(balance);
        if (!verifyResult.status) {
            this.view.showAlert(verifyResult.errorCode);
            return;
        }
        this.vendingMachine.chargeUserBalance(balance);
        this.view.renderUserBalance(this.vendingMachine.userBalance);
    }
    
    onReturnCoin = () => {
        this.vendingMachine.returnChargeCoins();
        this.view.renderUserBalance(this.vendingMachine.userBalance);
        this.view.renderMachineCoins(this.vendingMachine);
        this.view.renderReturnCoins(this.vendingMachine);
        this.vendingMachine.resetReturnCoins();
    }

    chargeMachineCoin = (balance) => {
        const verifyResult = verifyBalance(balance);
        if (!verifyResult.status) {
            this.view.showAlert(verifyResult.errorCode);
            return;
        }
        this.vendingMachine.addMachineCoinRandomly(balance);
        this.view.renderMachineCoins(this.vendingMachine);
    }
}