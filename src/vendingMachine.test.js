import assert from 'assert';
import {VendingMachine} from "./vendingMachine.js";

const vendingMachine = new VendingMachine();

describe('vendingMachine.js', () => {
    describe('#findIndexByName(name,target)', () => {
        const array = [
            {'name':'123'},
            {'name':'abc'},
            {'name':'def'},
        ]
        it('abc 라는 이름을 입력했을 때 name을 가진 객체의 인덱스인 1을 반환해야한다', () => {
            const name = 'abc';
            const result = vendingMachine.findIndexByName(name, array);
            assert.ok(result === 1);
        });

        it('abc 라는 이름을 입력했을 때 name을 가진 객체의 인덱스인 2를 반환해야한다', () => {
            const name = 'def';
            const result = vendingMachine.findIndexByName(name, array);
            assert.ok(result === 2);
        });
    });
});
