import {VendingMachine} from "../model/vendingMachine.js";
import {View} from "../view/view.js";
import {SELECTOR} from "../constants/constants.js";
import {
    verifyBalance,
    verifyProductNameInput,
    verifyProductPriceInput,
    verifyProductQuantityInput, verityEnoughBalance
} from "../utils/verifier.js";
import {$} from "../utils/utils.js";

export class Controller {
    constructor() {
        this.init();
    }

    init() {
        this.view = new View();
        this.vendingMachine = new VendingMachine();
        this.initRender();
        this.productManageTabButtonHandler();
        this.chargeCoinButtonTabHandler();
        this.productPurchaseButtonTabHandler();
        this.addProductButtonHandler();
        this.machineCoinChargeButtonHandler();
        this.chargeUserBalanceButtonHandler();
        this.coinReturnButtonHandler();
    }

    initRender() {
        this.view.renderProductList(this.vendingMachine.products);
        this.view.renderPurchaseList(this.vendingMachine.products);
        this.view.renderMachineCoins(this.vendingMachine);
        this.view.renderUserBalance(this.vendingMachine.userBalance);
        this.addPurchaseButtonHandler();
    }

    productManageTabButtonHandler() {
        $(SELECTOR.PRODUCT_MENU).onclick = () => {
            this.view.showProductManageTab();
        }
    }

    chargeCoinButtonTabHandler() {
        $(SELECTOR.COIN_MENU).onclick = () => {
            this.view.showChargeCoinTab();
        }
    }

    productPurchaseButtonTabHandler() {
        $(SELECTOR.PURCHASE_MENU).onclick = () => {
            this.view.showProductPurchaseTab();
        }
    }

    addProductButtonHandler() {
        $(SELECTOR.PRODUCT_ADD_BUTTON).onclick = (e) => {
            e.preventDefault();
            const verifyResult = [verifyProductNameInput($(SELECTOR.PRODUCT_NAME_INPUT)), verifyProductPriceInput($(SELECTOR.PRODUCT_PRICE_INPUT)), verifyProductQuantityInput($(SELECTOR.PRODUCT_QUANTITY_INPUT))];
            const errorIndex = verifyResult.findIndex((result)=>result.status === false);
            if (errorIndex !== -1) {
                this.view.showAlert(verifyResult[errorIndex].errorCode);
                return
            }
            this.vendingMachine.addProduct($(SELECTOR.PRODUCT_NAME_INPUT).value, $(SELECTOR.PRODUCT_PRICE_INPUT).value, $(SELECTOR.PRODUCT_QUANTITY_INPUT).value);
            this.view.renderProductList(this.vendingMachine.products);
            this.view.renderPurchaseList(this.vendingMachine.products);
            this.resetListValue([$(SELECTOR.PRODUCT_PRICE_INPUT), $(SELECTOR.PRODUCT_QUANTITY_INPUT), $(SELECTOR.PRODUCT_NAME_INPUT)]);
            this.addPurchaseButtonHandler();
        }
    }

    addPurchaseButtonHandler() {
        const buttonList = document.querySelectorAll(SELECTOR.PURCHASE_ITEM_BUTTON);
        buttonList.forEach((button, inx) => {
            button.onclick = () => {
                if (!verityEnoughBalance(this.vendingMachine.userBalance, this.vendingMachine.products[inx].price)) {
                    return
                }
                this.vendingMachine.purchaseProduct(inx);
                this.view.renderProductList(this.vendingMachine.products);
                this.view.renderPurchaseList(this.vendingMachine.products);
                this.addPurchaseButtonHandler();
                this.view.renderUserBalance(this.vendingMachine.userBalance);
            }
        })
    }

    machineCoinChargeButtonHandler() {
        $(SELECTOR.COIN_CHARGE_BUTTON).onclick = () => {
            const verifyResult = verifyBalance($(SELECTOR.COIN_CHARGE_INPUT));
            if (!verifyResult.status) {
                this.view.showAlert(verifyResult.errorCode);
                return;
            }
            this.vendingMachine.addMachineCoinRandomly($(SELECTOR.COIN_CHARGE_INPUT).value);
            this.view.renderMachineCoins(this.vendingMachine);
            $(SELECTOR.COIN_CHARGE_INPUT).value = '';
        }
    }

    chargeUserBalanceButtonHandler() {
        $(SELECTOR.PURCHASE_CHARGE_BUTTON).onclick = () => {
            const balanceInput = $(SELECTOR.PURCHASE_CHARGE_INPUT);
            const verifyResult = verifyBalance(balanceInput);
            if (!verifyResult.status) {
                this.view.showAlert(verifyResult.errorCode);
                return;
            }
            this.vendingMachine.chargeUserBalance(balanceInput.value);
            this.view.renderUserBalance(this.vendingMachine.userBalance);
            balanceInput.value = '';
        }
    }

    coinReturnButtonHandler() {
        $(SELECTOR.COIN_RETURN_BUTTON).onclick = () => {
            this.vendingMachine.returnChargeCoins();
            this.view.renderUserBalance(this.vendingMachine.userBalance);
            this.view.renderMachineCoins(this.vendingMachine);
            this.view.renderReturnCoins(this.vendingMachine);
            this.vendingMachine.resetReturnCoins();
        }
    }
    
    resetListValue(resetList) {
        resetList.forEach((resetTarget) => {
            resetTarget.value = ''
        });
    }
}