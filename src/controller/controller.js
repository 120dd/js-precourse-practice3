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
            this.vendingMachine.addProduct($productNameInput.value,$productPriceInput.value,$productQuantityInput.value);
            this.view.renderProductList(this.vendingMachine.products)
            this.resetListValue([$productNameInput,$productPriceInput,$productQuantityInput])
        }
    }
    
    resetListValue(resetList){
        resetList.forEach((resetTarget) => {resetTarget.value = ''});
    }
    
    machineCoinChargeButtonHandler(){
        this.getButtons().$chargeCoinButton.onclick = () => {
            console.log(this.getInputs().$chargeCoinInput.value)
        }
    }
    
    getButtons() {
        return {
            $productManageTabButton: document.querySelector(SELECTOR.PRODUCT_MENU),
            $chargeCoinTabButton: document.querySelector(SELECTOR.COIN_MENU),
            $productPurchaseTabButton: document.querySelector(SELECTOR.PURCHASE_MENU),
            $productAddButton: document.querySelector(SELECTOR.PRODUCT_ADD_BUTTON),
            $chargeCoinButton: document.querySelector(SELECTOR.COIN_CHARGE_BUTTON),
        }
    }

    getInputs() {
        return {
            $productNameInput: document.querySelector(SELECTOR.PRODUCT_NAME_INPUT),
            $productPriceInput: document.querySelector(SELECTOR.PRODUCT_PRICE_INPUT),
            $productQuantityInput: document.querySelector(SELECTOR.PRODUCT_QUANTITY_INPUT),
            $chargeCoinInput: document.querySelector(SELECTOR.COIN_CHARGE_INPUT),
        }
    }
}