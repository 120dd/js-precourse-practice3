import {
    CHARGE_COIN_TAB,
    COMMON_HTML,
    PRODUCT_MANAGE_TAB, PRODUCT_PURCHASE_TAB
} from "../constants/templets.js";

export class Index {
    constructor() {
        this.$app = document.querySelector("#app"); 
        this.tabs = {
            $productManageTab:document.createElement("div"),
            $chargeCoinTab:document.createElement("div"),
            $productPurchaseTab:document.createElement("div"),
        };
        this.init();
    }

    init() {
        this.renderCommon();
        this.renderProductManageTab();
        this.renderChargeCoinTab();
        this.renderProductPurchaseTab();
    }

    renderCommon() {
        this.$app.innerHTML = COMMON_HTML;
    }

    renderProductManageTab() {
        this.tabs.$productManageTab.innerHTML = PRODUCT_MANAGE_TAB;
        this.$app.appendChild(this.tabs.$productManageTab);
    }
    
    renderChargeCoinTab(){
        this.tabs.$chargeCoinTab.innerHTML = CHARGE_COIN_TAB;
        this.tabs.$chargeCoinTab.style.display = 'none';
        this.tabs.$productManageTab.after(this.tabs.$chargeCoinTab);
    }

    renderProductPurchaseTab(){
        this.tabs.$productPurchaseTab.innerHTML = PRODUCT_PURCHASE_TAB;
        this.tabs.$productPurchaseTab.style.display = 'none';
        this.tabs.$chargeCoinTab.after(this.tabs.$productPurchaseTab)
    }
    
    showProductManageTab(){
        this.tabs.$productManageTab.style.display = 'block';
        this.tabs.$chargeCoinTab.style.display = 'none';
        this.tabs.$productPurchaseTab.style.display = 'none';
    }

    showChargeCoinTab(){
        this.tabs.$productManageTab.style.display = 'none';
        this.tabs.$chargeCoinTab.style.display = 'block';
        this.tabs.$productPurchaseTab.style.display = 'none';
    }

    showProductPurchaseTab(){
        this.tabs.$productManageTab.style.display = 'none';
        this.tabs.$chargeCoinTab.style.display = 'none';
        this.tabs.$productPurchaseTab.style.display = 'block';
    }
}