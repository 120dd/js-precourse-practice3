import 'mock-local-storage'

const assert = require('assert');
const {VendingMachine} = require("./vendingMachine.js");
const {Product} = require("./product.js");

const vendingMachine = new VendingMachine();

global.window = {}
window.localStorage = global.localStorage

describe('vendingMachine.js', () => {
    describe('#purchaseProduct(index)', () => {
        it('products 의 0번째 개수를 6개 감소시켰을 때 14를 반환해야한다', () => {
            vendingMachine.products = [new Product('콜라',20,1200)];
            vendingMachine.reduceProductQuantity(0, 6);
            assert.ok(vendingMachine.products[0].quantity === 14);
        });
    });
});
