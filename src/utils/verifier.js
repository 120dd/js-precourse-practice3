export function verifyProductNameInput(name) {
    if (name.value === '') {
        alert('상품명을 입력해주세요');
        return false
    }
    return true
}

export function verifyProductPriceInput(price) {
    if (price.value === '') {
        alert('가격을 입력해주세요');
        return false
    }
    if (price.value < 0) {
        alert('가격은 10원 보다 비싸야합니다');
        return false
    }
    if (price.value % 10 !== 0) {
        alert('가격은 10원 단위만 가능합니다');
        return false
    }
    return true
}

export function verifyProductQuantityInput(quantity) {
    if (quantity.value === '') {
        alert('수량을 입력해주세요');
        return false
    }
    if (quantity.value < 0) {
        alert('수량은 0보다 커야합니다');
        return false
    }
    return true
}

export function verifyBalance(balanceInput) {
    if (balanceInput.value === '') {
        alert('금액을 입력해주세요');
        return false
    }
    if (balanceInput.value < 0) {
        alert('금액은 0보다 커야합니다');
        return false
    }
    if (balanceInput.value % 10 !== 0) {
        alert('금액은 10원 단위만 가능합니다');
        return false
    }
    return true;
}

export function verityEnoughBalance(userBalance, price) {
    if (userBalance < price) {
        alert('소지금이 부족합니다!')
        return false;
    }
    return true;
}