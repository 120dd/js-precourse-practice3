import {ALERT_COMMENTS} from "../constants/constants.js";

export function verifyProductNameInput(name) {
    if (name.value === '') {
        return {status:false,errorCode:ALERT_COMMENTS.enterName};
    }
    return {status: true};
}

export function verifyProductPriceInput(price) {
    if (price.value === '') {
        return {status:false,errorCode:ALERT_COMMENTS.enterPrice};
    }
    if (price.value < 0) {
        return {status:false,errorCode:ALERT_COMMENTS.priceMoreThan10};
    }
    if (price.value % 10 !== 0) {
        return {status:false,errorCode:ALERT_COMMENTS.priceShouldMultipleOf10};
    }
    return {status: true};
}

export function verifyProductQuantityInput(quantity) {
    if (quantity.value === '') {
        return {status:false,errorCode:ALERT_COMMENTS.enterQuantity};
    }
    if (quantity.value < 0) {
        return {status:false,errorCode:ALERT_COMMENTS.quantityShouldMoreThan0};
    }
    return {status: true};
}

export function verifyBalance(balanceInput) {
    if (balanceInput.value === '') {
        return {status:false,errorCode:ALERT_COMMENTS.enterBalance};
    }
    if (balanceInput.value < 0) {
        return {status:false,errorCode:ALERT_COMMENTS.balanceShouldMoreThan0};
    }
    if (balanceInput.value % 10 !== 0) {
        return {status:false,errorCode:ALERT_COMMENTS.balanceShouldMultipleOf10};
    }
    return {status: true};
}

export function verityEnoughBalance(userBalance, price) {
    if (userBalance < price) {
        return {status:false,errorCode:ALERT_COMMENTS.notEnoughBalance};
    }
    return {status: true};
}