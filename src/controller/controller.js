import {VendingMachine} from "../model/vendingMachine.js";
import {Index} from "../view/index.js";
import {SELECTOR} from "../constants/constants.js";

export class Controller {
    constructor() {
        this.init();
    }

    init() {
        this.vendingMachine = new VendingMachine();
        this.view = new Index();
        this.productManageTabButtonHandler();
        this.chargeCoinButtonTabHandler();
        this.productPurchaseButtonTabHandler();
        this.addProductButtonHandler();
    }

    productManageTabButtonHandler() {
        this.getButtons().$productManageButton.onclick = () => {
            this.view.showProductManageTab();
        }
    }

    chargeCoinButtonTabHandler() {
        this.getButtons().$chargeCoinButton.onclick = () => {
            this.view.showChargeCoinTab();
        }
    }

    productPurchaseButtonTabHandler() {
        this.getButtons().$productPurchaseButton.onclick = () => {
            this.view.showProductPurchaseTab();
        }
    }

    addProductButtonHandler() {
        this.getButtons().$productAddButton.onclick = (e) => {
            e.preventDefault();
            const productName = this.getInputs().$productNameInput.value;
            const productPrice = this.getInputs().$productPriceInput.value;
            const productQuantity = this.getInputs().$productQuantityInput.value;
            this.vendingMachine.addProduct(productName,productPrice,productQuantity);
            this.view.showProductList(this.vendingMachine.products)
            console.log(this.vendingMachine.products);
        }
    }

    getButtons() {
        return {
            $productManageButton: document.querySelector(SELECTOR.PRODUCT_MENU),
            $chargeCoinButton: document.querySelector(SELECTOR.COIN_MENU),
            $productPurchaseButton: document.querySelector(SELECTOR.PURCHASE_MENU),
            $productAddButton: document.querySelector(SELECTOR.PRODUCT_ADD_BUTTON)
        }
    }

    getInputs() {
        return {
            $productNameInput: document.querySelector(SELECTOR.PRODUCT_NAME_INPUT),
            $productPriceInput: document.querySelector(SELECTOR.PRODUCT_PRICE_INPUT),
            $productQuantityInput: document.querySelector(SELECTOR.PRODUCT_QUANTITY_INPUT)
        }
    }
}