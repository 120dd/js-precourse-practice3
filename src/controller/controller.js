import { VendingMachine } from '../model/vendingMachine.js';
import { View } from '../view/view.js';
import {
	verifyBalance,
	verifyProductNameInput,
	verifyProductPriceInput,
	verifyProductQuantityInput,
	verityEnoughBalance,
} from './verifier.js';
import { MachineData } from '../model/machineData.js';

export class Controller {
	constructor() {
		this.init();
	}

	init() {
		this.vendingMachineData = new MachineData();
		this.vendingMachine = new VendingMachine(this.vendingMachineData);
		this.view = new View();
		this.initRender();
		this.view.addPurchaseButtonHandler(this.onPurchaseProduct);
		this.view.registerProductAddHandler(this.onAddProduct);
		this.view.registerMachineCoinChargeRequastedHandler(this.chargeMachineCoin);
		this.view.registerUserBalanceRequestedHandler(this.onChargeUserBalance);
		this.view.registerReturnCoinRequestedHandler(this.onReturnCoin);
	}

	initRender() {
		this.view.renderProductList(this.vendingMachineData.products);
		this.view.renderPurchaseList(this.vendingMachineData.products);
		this.view.renderMachineCoins(this.vendingMachineData);
		this.view.renderUserBalance(this.vendingMachineData.userBalance);
	}

	onAddProduct = product => {
		const verifyResult = [
			verifyProductNameInput(product.name),
			verifyProductPriceInput(product.price),
			verifyProductQuantityInput(product.quantity),
		];
		const errorIndex = verifyResult.findIndex(result => result.status === false);
		if (errorIndex !== -1) {
			const errorCode = verifyResult[errorIndex].errorCode;
			this.view.showAlert(errorCode);
			return;
		}
		this.vendingMachine.addProduct(product.name, Number(product.price), Number(product.quantity));
		this.view.renderProductList(this.vendingMachineData.products);
		this.view.renderPurchaseList(this.vendingMachineData.products);
		this.view.addPurchaseButtonHandler(this.onPurchaseProduct);
	};

	onPurchaseProduct = productIndex => {
		const verifyResult = verityEnoughBalance(
			this.vendingMachineData.userBalance,
			this.vendingMachineData.products[productIndex].price,
		);
		if (!verifyResult.status) {
			this.view.showAlert(verifyResult.errorCode);
			return;
		}
		this.vendingMachine.purchaseProduct(productIndex);
		this.view.renderProductList(this.vendingMachineData.products);
		this.view.renderPurchaseList(this.vendingMachineData.products);
		this.view.addPurchaseButtonHandler(this.onPurchaseProduct);
		this.view.renderUserBalance(this.vendingMachineData.userBalance);
	};

	onChargeUserBalance = balance => {
		const verifyResult = verifyBalance(balance);
		if (!verifyResult.status) {
			this.view.showAlert(verifyResult.errorCode);
			return;
		}
		this.vendingMachine.chargeUserBalance(balance);
		this.view.renderUserBalance(this.vendingMachineData.userBalance);
	};

	onReturnCoin = () => {
		this.vendingMachine.returnChargeCoins();
		this.view.renderUserBalance(this.vendingMachineData.userBalance);
		this.view.renderMachineCoins(this.vendingMachineData);
		this.view.renderReturnCoins(this.vendingMachineData);
		this.vendingMachineData.resetReturnCoins();
	};

	chargeMachineCoin = balance => {
		const verifyResult = verifyBalance(balance);
		if (!verifyResult.status) {
			this.view.showAlert(verifyResult.errorCode);
			return;
		}
		this.vendingMachine.addMachineCoins(balance);
		this.view.renderMachineCoins(this.vendingMachineData);
	};
}
