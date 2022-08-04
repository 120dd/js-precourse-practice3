import {VendingMachine} from "../model/vendingMachine.js";
import {View} from "../view/view.js";
import {SELECTOR} from "../constants/constants.js";

export class Controller {
    constructor() {
        this.init();
    }

    init() {
        this.vendingMachine = new VendingMachine();
        this.view = new View();
        this.productManageTabButtonHandler();
        this.chargeCoinButtonTabHandler();
        this.productPurchaseButtonTabHandler();
        this.addProductButtonHandler();
        this.machineCoinChargeButtonHandler();
        this.chargeUserBalanceButtonHandler();
        this.coinReturnButtonHandler();
    }

    productManageTabButtonHandler() {
        this.getButtons().$productManageTabButton.onclick = () => {
            this.view.showProductManageTab();
        }
    }

    chargeCoinButtonTabHandler() {
        this.getButtons().$chargeCoinTabButton.onclick = () => {
            this.view.showChargeCoinTab();
        }
    }

    productPurchaseButtonTabHandler() {
        this.getButtons().$productPurchaseTabButton.onclick = () => {
            this.view.showProductPurchaseTab();
        }
    }

    addProductButtonHandler() {
        this.getButtons().$productAddButton.onclick = (e) => {
            e.preventDefault();
            const {$productNameInput, $productPriceInput, $productQuantityInput} = this.getInputs();
            this.vendingMachine.addProduct($productNameInput.value, $productPriceInput.value, $productQuantityInput.value);
            this.view.renderProductList(this.vendingMachine.products);
            this.view.renderPurcharseList(this.vendingMachine.products);
            this.resetListValue([$productNameInput, $productPriceInput, $productQuantityInput]);
            this.addPurchaseButtonHandler();
        }
    }

    addPurchaseButtonHandler() {
        const buttonList = document.querySelectorAll(SELECTOR.PURCHASE_ITEM_BUTTON);
        buttonList.forEach((button, inx) => {
            button.onclick = () => {
                this.vendingMachine.purchaseProduct(inx);
                this.view.renderPurcharseList(this.vendingMachine.products);
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
        const {$chargeCoinInput} = this.getInputs();
        this.getButtons().$chargeCoinButton.onclick = () => {
            this.vendingMachine.addMachineCoinRandomly($chargeCoinInput.value);
            this.renderMachineCoins();
            $chargeCoinInput.value = '';
        }
    }

    renderMachineCoins() {
        const {$machine500Quantity, $machine100Quantity, $machine50Quantity, $machine10Quantity} = this.getNodes();
        const coinQuantityNodes = [$machine500Quantity, $machine100Quantity, $machine50Quantity, $machine10Quantity];
        coinQuantityNodes.map((node, inx) => {
            this.view.renderCoin(node, this.vendingMachine.machineCoins[inx].quantity);
        })
    }

    chargeUserBalanceButtonHandler() {
        this.getButtons().$chargeUserBalance.onclick = () => {
            const balanceInput = this.getInputs().$chargeUserBalanceInput;
            this.vendingMachine.chargeUserBalance(balanceInput.value);
            this.view.renderUserBalance(this.vendingMachine.userBalance);
            balanceInput.value = '';
        }
    }

    coinReturnButtonHandler() {
        this.getButtons().$coinReturnButton.onclick = () => {
            this.vendingMachine.returnChargeCoins();
            this.view.renderUserBalance(this.vendingMachine.userBalance);
            this.renderMachineCoins();
            this.renderReturnCoins()
        }
    }
    
    renderReturnCoins(){
        this.view.renderCoin(this.getNodes().$return500Quantity,this.vendingMachine.returnCoins[0].quantity)
        this.view.renderCoin(this.getNodes().$return100Quantity,this.vendingMachine.returnCoins[1].quantity)
        this.view.renderCoin(this.getNodes().$return50Quantity,this.vendingMachine.returnCoins[2].quantity)
        this.view.renderCoin(this.getNodes().$return10Quantity,this.vendingMachine.returnCoins[3].quantity)
    }

    getButtons() {
        return {
            $productManageTabButton: document.querySelector(SELECTOR.PRODUCT_MENU),
            $chargeCoinTabButton: document.querySelector(SELECTOR.COIN_MENU),
            $productPurchaseTabButton: document.querySelector(SELECTOR.PURCHASE_MENU),
            $productAddButton: document.querySelector(SELECTOR.PRODUCT_ADD_BUTTON),
            $chargeCoinButton: document.querySelector(SELECTOR.COIN_CHARGE_BUTTON),
            $chargeUserBalance: document.querySelector(SELECTOR.PURCHASE_CHARGE_BUTTON),
            $coinReturnButton: document.querySelector(SELECTOR.COIN_RETURN_BUTTON),
        }
    }

    getInputs() {
        return {
            $productNameInput: document.querySelector(SELECTOR.PRODUCT_NAME_INPUT),
            $productPriceInput: document.querySelector(SELECTOR.PRODUCT_PRICE_INPUT),
            $productQuantityInput: document.querySelector(SELECTOR.PRODUCT_QUANTITY_INPUT),
            $chargeCoinInput: document.querySelector(SELECTOR.COIN_CHARGE_INPUT),
            $chargeUserBalanceInput: document.querySelector(SELECTOR.PURCHASE_CHARGE_INPUT),
        }
    }

    getNodes() {
        return {
            $machine500Quantity: document.querySelector(SELECTOR.COIN_500),
            $machine100Quantity: document.querySelector(SELECTOR.COIN_100),
            $machine50Quantity: document.querySelector(SELECTOR.COIN_50),
            $machine10Quantity: document.querySelector(SELECTOR.COIN_10),
            $return500Quantity: document.querySelector(SELECTOR.RETURN_COIN_500),
            $return100Quantity: document.querySelector(SELECTOR.RETURN_COIN_100),
            $return50Quantity: document.querySelector(SELECTOR.RETURN_COIN_50),
            $return10Quantity: document.querySelector(SELECTOR.RETURN_COIN_10),
        }
    }
}