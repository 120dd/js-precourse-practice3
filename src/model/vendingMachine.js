export class VendingMachine {
	constructor(machineData) {
		this.machineData = machineData;
	}

	addProduct(name, price, quantity) {
		this.machineData.addProductData(name, price, quantity);
	}

	addMachineCoins(balance) {
		this.machineData.addMachineCoinRandomly(balance);
	}

	chargeUserBalance(balance) {
		this.machineData.chargeUserBalanceData(balance);
	}

	purchaseProduct(index) {
		this.machineData.reduceProductQuantity(index, 1);
		this.machineData.reduceUserBalance(index);
	}

	returnChargeCoins() {
		this.machineData.changeReturnChargeCoinsData();
	}
}
