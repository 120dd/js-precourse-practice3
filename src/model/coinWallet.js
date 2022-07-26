import {COIN_TYPE} from "../constants.js";

export class CoinWallet{
    constructor() {
        this.wallet = new Map([
            [COIN_TYPE['500'],1],
            [COIN_TYPE['100'],1],
            [COIN_TYPE['50'],1],
            [COIN_TYPE['10'],1],
        ]);
        this.totalBalance = this.getTotalBalance();
    }

    insertCoin(coinType, amount){
        this.wallet.set(COIN_TYPE[coinType],this.wallet.get(coinType)+amount);
        this.totalBalance = this.getTotalBalance();
    }

    getTotalBalance(){
        let totalBalance = 0;
        for (const coin of this.wallet.entries()){
            totalBalance += Number(coin[0])*coin[1]
        }
        return totalBalance;
    }
}