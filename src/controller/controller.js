import {VendingMachine} from "../model/vendingMachine.js";
import {Index} from "../view/index.js";

export class Controller {
    constructor() {
        this.init();
    }

    init() {
        this.vendingMachine = new VendingMachine();
        this.view = new Index();
        this.productManageButtonHandler();
        this.chargeCoinButtonHandler();
        this.productPurchaseButtonHandler();
    }

    productManageButtonHandler() {
        this.getButtons().$productManageButton.onclick = () => {
            this.view.showProductManageTab();
        }
    }

    chargeCoinButtonHandler() {
        this.getButtons().$chargeCoinButton.onclick = () => {
            this.view.showChargeCoinTab();
        }
    }

    productPurchaseButtonHandler() {
        this.getButtons().$productPurchaseButton.onclick = () => {
            this.view.showProductPurchaseTab();
        }
    }

    getButtons() {
        return {
            $productManageButton: document.querySelector('#product-add-menu'),
            $chargeCoinButton: document.querySelector('#vending-machine-manage-menu'),
            $productPurchaseButton: document.querySelector('#product-purchase-menu'),
        }
    }
}