import { VendingMachine } from '../model/vendingMachine.js';
import { View } from '../view/view.js';
import { verifyBalance, verifyProduct, verityEnoughBalance } from './verifier.js';
import { LocalDataPersister } from '../DataPersister/LocalDataPersister.js';

export class Controller {
	constructor() {
		this.init();
	}

	init() {
		this.persister = new LocalDataPersister();
		this.vendingMachine = new VendingMachine(this.persister);
		this.view = new View();
		this.view.renderVendingMachine(this.vendingMachine);
		this.initHandlers();
	}

	initHandlers() {
		this.view.addPurchaseButtonHandler(this.onPurchaseProduct);
		this.view.registerProductAddHandler(this.onAddProduct);
		this.view.registerMachineCoinChargeRequastedHandler(this.chargeMachineCoin);
		this.view.registerUserBalanceRequestedHandler(this.onChargeUserBalance);
		this.view.registerReturnCoinRequestedHandler(this.onReturnCoin);
	}

	onAddProduct = product => {
		const verifyResult = verifyProduct(product);
		const errorIndex = verifyResult.findIndex(result => result.status === false);
		if (errorIndex !== -1) {
			const errorCode = verifyResult[errorIndex].errorCode;
			this.view.showAlert(errorCode);
			return;
		}
		this.vendingMachine.addProduct(product);
		this.view.renderVendingMachine(this.vendingMachine);
		this.view.addPurchaseButtonHandler(this.onPurchaseProduct);
	};

	onPurchaseProduct = productIndex => {
		const verifyResult = verityEnoughBalance(
			this.vendingMachine.userBalance,
			this.vendingMachine.products[productIndex].price,
		);
		if (!verifyResult.status) {
			this.view.showAlert(verifyResult.errorCode);
			return;
		}
		this.vendingMachine.purchaseProduct(productIndex);
		this.view.renderVendingMachine(this.vendingMachine);
		this.view.addPurchaseButtonHandler(this.onPurchaseProduct);
	};

	onChargeUserBalance = balance => {
		const verifyResult = verifyBalance(balance);
		if (!verifyResult.status) {
			this.view.showAlert(verifyResult.errorCode);
			return;
		}
		this.vendingMachine.chargeUserBalance(balance);
		this.view.renderVendingMachine(this.vendingMachine);
	};

	onReturnCoin = () => {
		this.vendingMachine.returnChargeCoins();
		this.view.renderVendingMachine(this.vendingMachine);
		this.vendingMachine.resetReturnCoins();
	};

	chargeMachineCoin = balance => {
		const verifyResult = verifyBalance(balance);
		if (!verifyResult.status) {
			this.view.showAlert(verifyResult.errorCode);
			return;
		}
		this.vendingMachine.addMachineCoinRandomly(balance);
		this.view.renderMachineCoins(this.vendingMachine);
	};
}
