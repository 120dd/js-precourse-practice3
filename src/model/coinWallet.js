import {COIN_TYPE} from "../constants.js";

export class CoinWallet{
    constructor() {
        this.wallet = new Map([
            [COIN_TYPE['500'],6],
            [COIN_TYPE['100'],10],
            [COIN_TYPE['50'],4],
            [COIN_TYPE['10'],2],
        ]);
        this.totalBalance = this.getTotalBalance();
    }

    insertCoin(coinType, amount){
        this.wallet.set(COIN_TYPE[coinType],this.wallet.get(coinType)+amount);
    }

    getTotalBalance(){
        let totalBalance = 0;
        for (const coin of this.wallet.entries()){
            totalBalance += Number(coin[0])*coin[1]
        }
        return totalBalance;
    }
}