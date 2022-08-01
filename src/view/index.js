import {$app, $productView, COMMON_HTML, PRODUCT_MANAGE_TAB} from "../constants/templets.js";

export class View {
    constructor() {
        this.renderCommon();
        this.renderProductManageTab();
    }

    renderCommon(){
        $app.innerHTML = COMMON_HTML;
    }
    
    renderProductManageTab(){
        $productView.innerHTML = PRODUCT_MANAGE_TAB;
        $app.after($productView);
    }
}