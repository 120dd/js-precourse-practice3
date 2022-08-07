import {$} from '../view/DOMs.js';
import {VendingMachine} from "../model/vendingMachine.js";
import {View} from "../view/view.js";
import {SELECTOR} from "../constants/constants.js";
import {verifyProductNameInput, verifyProductPriceInput, verifyProductQuantityInput} from "../utils/verifier.js";

export class Controller {
    constructor() {
        this.init();
    }

    init() {
        this.view = new View();
        this.vendingMachine = new VendingMachine();
        this.productManageTabButtonHandler();
        this.chargeCoinButtonTabHandler();
        this.productPurchaseButtonTabHandler();
        this.addProductButtonHandler();
        this.machineCoinChargeButtonHandler();
        this.chargeUserBalanceButtonHandler();
        this.coinReturnButtonHandler();
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
            if (!verifyProductNameInput($(SELECTOR.PRODUCT_NAME_INPUT)) || !verifyProductPriceInput($(SELECTOR.PRODUCT_PRICE_INPUT)) || !verifyProductQuantityInput($(SELECTOR.PRODUCT_QUANTITY_INPUT))) {
                return
            }
            console.log(22);
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
                this.vendingMachine.purchaseProduct(inx);
                this.view.renderPurchaseList(this.vendingMachine.products);
                this.addPurchaseButtonHandler();
                this.view.renderUserBalance(this.vendingMachine.userBalance);
            }
        })
    }

    resetListValue(resetList) {
        resetList.forEach((resetTarget) => {
            resetTarget.value = ''
        });
    }

    machineCoinChargeButtonHandler() {
        $(SELECTOR.COIN_CHARGE_BUTTON).onclick = () => {
            this.vendingMachine.addMachineCoinRandomly($(SELECTOR.COIN_CHARGE_INPUT).value);
            this.renderMachineCoins();
            $(SELECTOR.COIN_CHARGE_INPUT).value = '';
        }
    }

    renderMachineCoins() {
        const coinQuantityNodes = [$(SELECTOR.COIN_500), $(SELECTOR.COIN_100), $(SELECTOR.COIN_50), $(SELECTOR.COIN_10)];
        coinQuantityNodes.map((node, inx) => {
            this.view.renderCoin(node, this.vendingMachine.machineCoins[inx].quantity);
        })
    }

    chargeUserBalanceButtonHandler() {
        $(SELECTOR.PURCHASE_CHARGE_BUTTON).onclick = () => {
            const balanceInput = $(SELECTOR.PURCHASE_CHARGE_INPUT);
            this.vendingMachine.chargeUserBalance(balanceInput.value);
            this.view.renderUserBalance(this.vendingMachine.userBalance);
            balanceInput.value = '';
        }
    }

    coinReturnButtonHandler() {
        $(SELECTOR.COIN_RETURN_BUTTON).onclick = () => {
            this.vendingMachine.returnChargeCoins();
            this.view.renderUserBalance(this.vendingMachine.userBalance);
            this.renderMachineCoins();
            this.renderReturnCoins()
        }
    }

    renderReturnCoins() {
        this.view.renderCoin($(SELECTOR.RETURN_COIN_500), this.vendingMachine.returnCoins[0].quantity)
        this.view.renderCoin($(SELECTOR.RETURN_COIN_100), this.vendingMachine.returnCoins[1].quantity)
        this.view.renderCoin($(SELECTOR.RETURN_COIN_50), this.vendingMachine.returnCoins[2].quantity)
        this.view.renderCoin($(SELECTOR.RETURN_COIN_10), this.vendingMachine.returnCoins[3].quantity)
    }
}