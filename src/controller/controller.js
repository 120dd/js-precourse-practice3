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
        this.chargeUserBalanceButton();
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
            this.view.renderProductList(this.vendingMachine.products)
            this.resetListValue([$productNameInput, $productPriceInput, $productQuantityInput])
        }
    }

    resetListValue(resetList) {
        // eslint-disable-next-line no-param-reassign
        resetList.forEach((resetTarget) => {
            resetTarget.value = ''
        });
    }

    machineCoinChargeButtonHandler() {
        const {
            $machineCoin500Quantity,
            $machineCoin100Quantity,
            $machineCoin50Quantity,
            $machineCoin10Quantity
        } = this.getMachineCoinQuantityNodes();
        const {$chargeCoinInput} = this.getInputs();
        this.getButtons().$chargeCoinButton.onclick = () => {
            this.vendingMachine.addMachineCoinRandomly($chargeCoinInput.value);
            this.view.renderMachineCoins($machineCoin500Quantity, this.vendingMachine.machineCoins[0].quantity);
            this.view.renderMachineCoins($machineCoin100Quantity, this.vendingMachine.machineCoins[1].quantity);
            this.view.renderMachineCoins($machineCoin50Quantity, this.vendingMachine.machineCoins[2].quantity);
            this.view.renderMachineCoins($machineCoin10Quantity, this.vendingMachine.machineCoins[3].quantity);
            $chargeCoinInput.value = '';
        }
    }
    
    chargeUserBalanceButton(){
        this.getButtons().$chargeUserBalance.onclick = () => {
            const balanceInput = this.getInputs().$chargeUserBalanceInput; 
            this.vendingMachine.chargeUserBalance(balanceInput.value);
        }
    }

    getButtons() {
        return {
            $productManageTabButton: document.querySelector(SELECTOR.PRODUCT_MENU),
            $chargeCoinTabButton: document.querySelector(SELECTOR.COIN_MENU),
            $productPurchaseTabButton: document.querySelector(SELECTOR.PURCHASE_MENU),
            $productAddButton: document.querySelector(SELECTOR.PRODUCT_ADD_BUTTON),
            $chargeCoinButton: document.querySelector(SELECTOR.COIN_CHARGE_BUTTON),
            $chargeUserBalance: document.querySelector(SELECTOR.PURCHASE_CHARGE_BUTTON),
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

    getMachineCoinQuantityNodes() {
        return {
            $machineCoin500Quantity: document.querySelector(SELECTOR.COIN_500),
            $machineCoin100Quantity: document.querySelector(SELECTOR.COIN_100),
            $machineCoin50Quantity: document.querySelector(SELECTOR.COIN_50),
            $machineCoin10Quantity: document.querySelector(SELECTOR.COIN_10),
        }
    }
}