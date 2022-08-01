import {
    $app,
    $chargeCoinTab, $productPurchaseTab,
    $productTab,
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
        $productTab.innerHTML = PRODUCT_MANAGE_TAB;
        $app.after($productTab);
    }
    
    renderChargeCoinTab(){
        $chargeCoinTab.innerHTML = CHARGE_COIN_TAB;
        $productTab.after($chargeCoinTab);
    }

    renderProductPurchaseTab(){
        $productPurchaseTab.innerHTML = PRODUCT_PURCHASE_TAB;
        $chargeCoinTab.after($productPurchaseTab)
    }
}