import {ERROR_CODE} from "../view/errorCodes.js";

export function verifyProductNameInput(name) {
    if (name === '') {
        return {status: false, errorCode: ERROR_CODE.ENTER_NAME};
    }
    return {status: true};
}

export function verifyProductPriceInput(price) {
    if (price === '') {
        return {status: false, errorCode: ERROR_CODE.ENTER_PRICE};
    }
    if (price < 10) {
        return {status: false, errorCode: ERROR_CODE.PRICE_MORE_THEN_TEN};
    }
    if (price % 10 !== 0) {
        return {status: false, errorCode: ERROR_CODE.PRICE_SHOULD_MULTIPLE_OF_TEN};
    }
    return {status: true};
}

export function verifyProductQuantityInput(quantity) {
    if (quantity === '') {
        return {status: false, errorCode: ERROR_CODE.ENTER_QUANTITY};
    }
    if (quantity <= 0) {
        return {status: false, errorCode: ERROR_CODE.QUANTITY_SHOULD_MORE_THAN_ZERO};
    }
    return {status: true};
}

export function verifyBalance(balance) {
    if (balance === '') {
        return {status: false, errorCode: ERROR_CODE.ENTER_BALANCE};
    }
    if (balance < 0) {
        return {status: false, errorCode: ERROR_CODE.BALANCE_SHOULD_MORE_THAN_ZERO};
    }
    if (balance % 10 !== 0) {
        return {status: false, errorCode: ERROR_CODE.BALANCE_SHOULD_MULTIPLE_OF_TEN};
    }
    return {status: true};
}

export function verityEnoughBalance(userBalance, price) {
    if (userBalance < price) {
        return {status: false, errorCode: ERROR_CODE.NOT_ENOUGH_BALANCE};
    }
    return {status: true};
}