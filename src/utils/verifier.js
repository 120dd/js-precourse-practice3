export function verifyProductNameInput(name) {
    if (name === ''){
        alert('상품명을 입력해주세요');
        return false
    }
    return true
}

export function verifyProductPriceInput(price) {
    if (price.value === ''){
        alert('가격을 입력해주세요');
        return false
    }
    if (price.value < 0){
        alert('가격은 10원 보다 비싸야합니다');
        return false
    }
    if (price.value % 10 !== 0){
        alert('가격은 1원 단위는 입력 불가합니다');
        return false
    }
    return true
}

export function verifyProductQuantityInput(quantity) {
    if (quantity.value === ''){
        alert('수량을 입력해주세요');
        return false
    }
    if (quantity.value < 0){
        alert('수량은 0보다 커야합니다');
        return false
    }
    return true
}