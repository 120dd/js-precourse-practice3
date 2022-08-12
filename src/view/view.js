import {
    CHARGE_COIN_TAB,
    CHARGED_BALANCE,
    COMMON_HTML,
    PRODUCT_LIST,
    PRODUCT_MANAGE_TAB,
    PRODUCT_PURCHASE_TAB,
    PURCHASE_PRODUCT_LIST
} from "../constants/templets.js";
import {SELECTOR} from "../constants/constants.js";
import {$} from "../utils/utils.js";
import {Product} from "../model/product.js";

export class View {
    constructor() {
        this.$app = $("#app");
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
        this.renderPurchaseList();
        this.chargeCoinButtonTabHandler();
        this.productManageTabButtonHandler();
        this.productPurchaseButtonTabHandler();
    }

    registerProductAddHandler(callback) {
        $(SELECTOR.PRODUCT_ADD_BUTTON).onclick = (e) => {
            e.preventDefault();
            const newProduct = new Product($(SELECTOR.PRODUCT_NAME_INPUT).value,
                $(SELECTOR.PRODUCT_PRICE_INPUT).value, $(SELECTOR.PRODUCT_QUANTITY_INPUT).value)
            callback(newProduct);
            this.resetListValue([$(SELECTOR.PRODUCT_NAME_INPUT), $(SELECTOR.PRODUCT_PRICE_INPUT),
                $(SELECTOR.PRODUCT_QUANTITY_INPUT)])
        }
    }

    registerMachineCoinChargeRequastedHandler(callback) {
        $(SELECTOR.COIN_CHARGE_BUTTON).onclick = (e) => {
            e.preventDefault();
            const balanceInput = $(SELECTOR.COIN_CHARGE_INPUT);
            callback(balanceInput.value)
            balanceInput.value = '';
        }
    }

    addPurchaseButtonHandler(callback) {
        const buttonList = document.querySelectorAll(SELECTOR.PURCHASE_ITEM_BUTTON);
        buttonList.forEach((button, productIndex) => {
            button.onclick = () => {
                callback(productIndex)
            }
        })
    }

    registerUserBalanceRequestedHandler(callback) {
        $(SELECTOR.PURCHASE_CHARGE_BUTTON).onclick = () => {
            const balanceInput = $(SELECTOR.PURCHASE_CHARGE_INPUT);
            callback(balanceInput.value);
            balanceInput.value = '';
        }
    }

    registerReturnCoinRequestedHandler(callback) {
        $(SELECTOR.COIN_RETURN_BUTTON).onclick = () => {
            callback();
        }

    }

    resetListValue(resetList) {
        resetList.forEach((resetTarget) => {
            resetTarget.value = ''
        });
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

    chargeCoinButtonTabHandler() {
        $(SELECTOR.COIN_MENU).onclick = () => {
            this.showChargeCoinTab();
        }
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

    productManageTabButtonHandler() {
        $(SELECTOR.PRODUCT_MENU).onclick = () => {
            this.showProductManageTab();
        }
    }

    productPurchaseButtonTabHandler() {
        $(SELECTOR.PURCHASE_MENU).onclick = () => {
            this.showProductPurchaseTab();
        }
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

    renderProductList(productList) {
        $(`.${SELECTOR.PRODUCT_MANAGE_ITEM}`) &&
        this.removeProductList(SELECTOR.PRODUCT_MANAGE_ITEM);
        productList.map((product) => {
            const $productList = document.createElement('tr');
            $productList.setAttribute("class", SELECTOR.PRODUCT_MANAGE_ITEM);
            $productList.innerHTML = PRODUCT_LIST(product.name, product.price, product.quantity);
            $('#added-product-table').appendChild($productList);
        });
    }

    removeProductList(className) {
        const nodeList = document.querySelectorAll(`.${className}`);
        nodeList.forEach((node) => {
            node.remove()
        })
    }

    renderCoin(target, quantity) {
        const newCoin = target.cloneNode(true);
        newCoin.innerText = `${quantity}개`;
        target.replaceWith(newCoin);
    }

    renderMachineCoins(vendingMachine) {
        const coinQuantityNodes = [$(SELECTOR.COIN_500), $(SELECTOR.COIN_100), $(SELECTOR.COIN_50),
            $(SELECTOR.COIN_10)];
        coinQuantityNodes.map((node, inx) => {
            this.renderCoin(node, vendingMachine.machineCoins[inx].quantity);
        })
    }

    renderReturnCoins(vendingMachine) {
        this.renderCoin($(SELECTOR.RETURN_COIN_500), vendingMachine.returnCoins[0].quantity);
        this.renderCoin($(SELECTOR.RETURN_COIN_100), vendingMachine.returnCoins[1].quantity);
        this.renderCoin($(SELECTOR.RETURN_COIN_50), vendingMachine.returnCoins[2].quantity);
        this.renderCoin($(SELECTOR.RETURN_COIN_10), vendingMachine.returnCoins[3].quantity);
    }

    renderUserBalance(amount) {
        $(SELECTOR.PURCHASE_CHARGE_AMOUNT).innerHTML = CHARGED_BALANCE(amount);
    }

    renderPurchaseList(productList) {
        $(`.${SELECTOR.PRODUCT_MANAGE_ITEM}`) &&
        this.removeProductList(SELECTOR.PRODUCT_PURCHASE_ITEM);
        productList?.map((product) => {
            const $product = document.createElement('tr');
            $product.setAttribute('class', SELECTOR.PRODUCT_PURCHASE_ITEM);
            $product.innerHTML =
                PURCHASE_PRODUCT_LIST(product.name, product.price, product.quantity);
            $('#purchaseMenuTable').appendChild($product);
        });
    }

    showAlert(errorCode) {
        alert(errorCode);
    }
}