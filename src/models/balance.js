export class Balance{
    /**
     * 
     * @param {number} quantity
     * @param {string} currency
     */
    constructor(quantity, currency) {
        this.quantity = quantity;
        this.currency = currency;
    }
    
    changeBalance(quantity){
        this.quantity += quantity;
    }
}