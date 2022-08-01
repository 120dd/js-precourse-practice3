import {
    $app,
    $chargeCoinTab, $productPurchaseTab,
    $productManageTab,
    CHARGE_COIN_TAB,
    COMMON_HTML,
    PRODUCT_MANAGE_TAB, PRODUCT_PURCHASE_TAB
} from "../constants/templets.js";

export class View {
    constructor() {
        this.init();
    }

    init() {
        this.renderCommon();
        this.renderProductManageTab();
        this.renderChargeCoinTab();
        this.renderProductPurchaseTab();
    }

    renderCommon() {
        $app.innerHTML = COMMON_HTML;
    }

    renderProductManageTab() {
        $productManageTab.innerHTML = PRODUCT_MANAGE_TAB;
        $app.after($productManageTab);
    }
    
    renderChargeCoinTab(){
        $chargeCoinTab.innerHTML = CHARGE_COIN_TAB;
        $chargeCoinTab.style.display = 'none';
        $productManageTab.after($chargeCoinTab);
    }

    renderProductPurchaseTab(){
        $productPurchaseTab.innerHTML = PRODUCT_PURCHASE_TAB;
        $productPurchaseTab.style.display = 'none';
        $chargeCoinTab.after($productPurchaseTab)
    }
    
    showProductManageTab(){
        $productManageTab.style.display = 'block';
        $chargeCoinTab.style.display = 'none';
        $productPurchaseTab.style.display = 'none';
    }

    showChargeCoinTab(){
        $productManageTab.style.display = 'none';
        $chargeCoinTab.style.display = 'block';
        $productPurchaseTab.style.display = 'none';
    }

    showProductPurchaseTab(){
        $productManageTab.style.display = 'none';
        $chargeCoinTab.style.display = 'none';
        $productPurchaseTab.style.display = 'block';
    }
}