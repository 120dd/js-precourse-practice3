import {
    CHARGE_COIN_TAB,
    COMMON_HTML, PRODUCT_LIST,
    PRODUCT_MANAGE_TAB, PRODUCT_PURCHASE_TAB
} from "../constants/templets.js";
import {SELECTOR} from "../constants/constants.js";

export class Index {
    constructor() {
        this.$app = document.querySelector("#app");
        this.tabs = {
            $productManageTab: document.createElement("div"),
            $chargeCoinTab: document.createElement("div"),
            $productPurchaseTab: document.createElement("div"),
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

    renderChargeCoinTab() {
        this.tabs.$chargeCoinTab.innerHTML = CHARGE_COIN_TAB;
        this.tabs.$chargeCoinTab.style.display = 'none';
        this.tabs.$productManageTab.after(this.tabs.$chargeCoinTab);
    }

    renderProductPurchaseTab() {
        this.tabs.$productPurchaseTab.innerHTML = PRODUCT_PURCHASE_TAB;
        this.tabs.$productPurchaseTab.style.display = 'none';
        this.tabs.$chargeCoinTab.after(this.tabs.$productPurchaseTab)
    }

    showProductManageTab() {
        this.tabs.$productManageTab.style.display = 'block';
        this.tabs.$chargeCoinTab.style.display = 'none';
        this.tabs.$productPurchaseTab.style.display = 'none';
    }

    showChargeCoinTab() {
        this.tabs.$productManageTab.style.display = 'none';
        this.tabs.$chargeCoinTab.style.display = 'block';
        this.tabs.$productPurchaseTab.style.display = 'none';
    }

    showProductPurchaseTab() {
        this.tabs.$productManageTab.style.display = 'none';
        this.tabs.$chargeCoinTab.style.display = 'none';
        this.tabs.$productPurchaseTab.style.display = 'block';
    }

    showProductList(productList) {
        document.querySelector(`.${SELECTOR.PRODUCT_MANAGE_ITEM}`) && this.removeProductList(SELECTOR.PRODUCT_MANAGE_ITEM);
        productList.map((product) => {
            const $productList = document.createElement('tr');
            $productList.setAttribute("class",SELECTOR.PRODUCT_MANAGE_ITEM);
            $productList.innerHTML = PRODUCT_LIST(product.name,product.price,product.quantity);
            document.querySelector('#productTableHeader').after($productList)
        });
    }
    
    removeProductList(className){
        document.querySelector(`.${className}`).innerHTML = ''
    }
}