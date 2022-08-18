import { ERROR_CODE } from '../view/errorCodes.js';
import { VerifyStatus } from './verifyStatus.js';

export function verifyProductNameInput(name) {
	const checkName = name.replaceAll(" ",'');
	if (checkName === '') {
		return new VerifyStatus(false, ERROR_CODE.ENTER_NAME);
	}
	return new VerifyStatus(true);
}

export function verifyProductPriceInput(price) {
	if (price === '') {
		return new VerifyStatus(false, ERROR_CODE.ENTER_PRICE);
	}
	if (price < 10) {
		return new VerifyStatus(false, ERROR_CODE.PRICE_MORE_THEN_TEN);
	}
	if (price % 10 !== 0) {
		return new VerifyStatus(false, ERROR_CODE.PRICE_SHOULD_MULTIPLE_OF_TEN);
	}
	return new VerifyStatus(true);
}

export function verifyProductQuantityInput(quantity) {
	if (quantity === '') {
		return new VerifyStatus(false, ERROR_CODE.ENTER_QUANTITY);
	}
	if (quantity <= 0) {
		return new VerifyStatus(false, ERROR_CODE.QUANTITY_SHOULD_MORE_THAN_ZERO);
	}
	return new VerifyStatus(true);
}

export function verifyBalance(balance) {
	if (balance === '') {
		return new VerifyStatus(false, ERROR_CODE.ENTER_BALANCE);
	}
	if (balance < 0) {
		return new VerifyStatus(false, ERROR_CODE.BALANCE_SHOULD_MORE_THAN_ZERO);
	}
	if (balance % 10 !== 0) {
		return new VerifyStatus(false, ERROR_CODE.BALANCE_SHOULD_MULTIPLE_OF_TEN);
	}
	return new VerifyStatus(true);
}

export function verityEnoughBalance(userBalance, price) {
	if (userBalance < price) {
		return new VerifyStatus(false, ERROR_CODE.NOT_ENOUGH_BALANCE);
	}
	return new VerifyStatus(true);
}

export function verifyProduct(product) {
	return [
		verifyProductNameInput(product.name),
		verifyProductPriceInput(product.price),
		verifyProductQuantityInput(product.quantity),
	];
}
