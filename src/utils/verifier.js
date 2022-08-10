import {ALERT_COMMENTS} from "../constants/constants.js";

export function verifyProductNameInput(name) {
    if (name.value === '') {
        return {status:false,errorCode:ALERT_COMMENTS.ENTER_NAME};
    }
    return {status: true};
}

export function verifyProductPriceInput(price) {
    if (price.value === '') {
        return {status:false,errorCode:ALERT_COMMENTS.ENTER_PRICE};
    }
    if (price.value < 0) {
        return {status:false,errorCode:ALERT_COMMENTS.PRICE_MORE_THEN_TEN};
    }
    if (price.value % 10 !== 0) {
        return {status:false,errorCode:ALERT_COMMENTS.PRICE_SHOULD_MULTIPLE_OF_TEN};
    }
    return {status: true};
}

export function verifyProductQuantityInput(quantity) {
    if (quantity.value === '') {
        return {status:false,errorCode:ALERT_COMMENTS.ENTER_QUANTITY};
    }
    if (quantity.value < 0) {
        return {status:false,errorCode:ALERT_COMMENTS.QUANTITY_SHOULD_MORE_THAN_ZERO};
    }
    return {status: true};
}

export function verifyBalance(balanceInput) {
    if (balanceInput.value === '') {
        return {status:false,errorCode:ALERT_COMMENTS.ENTER_BALANCE};
    }
    if (balanceInput.value < 0) {
        return {status:false,errorCode:ALERT_COMMENTS.BALANCE_SHOULD_MORE_THAN_ZERO};
    }
    if (balanceInput.value % 10 !== 0) {
        return {status:false,errorCode:ALERT_COMMENTS.BALANCE_SHOULD_MULTIPLE_OF_TEN};
    }
    return {status: true};
}

export function verityEnoughBalance(userBalance, price) {
    if (userBalance < price) {
        return {status:false,errorCode:ALERT_COMMENTS.NOT_ENOUGH_BALANCE};
    }
    return {status: true};
}