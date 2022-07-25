export class Coin {
    /**
     * @param {number} faceValue
     * @param {string} currency 원, 달러
     */
    constructor(faceValue, currency) {
        this.faceValue = faceValue;
        this.currency = currency;
    }
}