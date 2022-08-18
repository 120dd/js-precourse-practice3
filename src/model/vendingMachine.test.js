import 'mock-local-storage';
import { LocalDataPersister } from '../DataPersister/LocalDataPersister';

const assert = require('assert');
const { VendingMachine } = require('./vendingMachine.js');
const { Product } = require('./product.js');

const persister = new LocalDataPersister();
const vendingMachine = new VendingMachine(persister);
vendingMachine.products = [new Product('콜라', 20, 1200)];

global.window = {};
window.localStorage = global.localStorage;

describe('vendingMachine.js', () => {
	describe('#purchaseProduct(index)', () => {
		describe('#reduceProductQuantity(index,quantity)', () => {
			it('products 의 0번째 개수를 6개 감소시켰을 때 14를 반환해야한다', () => {
				vendingMachine.reduceProductQuantity(0, 6);
				assert.ok(vendingMachine.products[0].quantity === 14);
			});
		});
		describe('#reduceUserBalance(balance)', () => {
			it('userBalance 가 3000일 때 1000을 감소 시키면 2000을 반환해야한다', () => {
				vendingMachine.userBalance = 3000;
				vendingMachine.reduceUserBalance(1000);
				assert.ok(vendingMachine.userBalance === 2000);
			});
		});
	});
});
