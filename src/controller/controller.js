import {VendingMachine} from "../model/vendingMachine.js";
import {View} from "../view/index.js";

export class Controller {
    constructor() {
        this.init();
    }

    init() {
        this.vendingMachine = new VendingMachine();
        this.view = new View();
        this.productManageButtonHandler();
        this.chargeCoinButtonHandler();
        this.productPurchaseButtonHandler();
    }

    productManageButtonHandler() {
        const $productManageButton = document.querySelector('#product-add-menu');
        $productManageButton.onclick = () => {
            this.view.showProductManageTab();
        }
    }

    chargeCoinButtonHandler() {
        const $chargeCoinButton = document.querySelector('#vending-machine-manage-menu');
        $chargeCoinButton.onclick = () => {
            this.view.showChargeCoinTab();
        }
    }

    productPurchaseButtonHandler() {
        const $productPurchaseButton = document.querySelector('#product-purchase-menu');
        $productPurchaseButton.onclick = () => {
            this.view.showProductPurchaseTab();
        }
    }
}