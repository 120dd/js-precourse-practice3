import {Coin} from "./coin.js";

export class CoinWallet {
    constructor() {
        this.wallet = this.initializeWallet();
    }
    
    createWalletInitializeInfo(faceValue){
        return [['coin',new Coin(faceValue,'원')],['quantity',0]]
    }
    
    initializeWallet(){
        return new Map(
            [
                this.createWalletInitializeInfo(500),
                this.createWalletInitializeInfo(100),
                this.createWalletInitializeInfo(50),
                this.createWalletInitializeInfo(10),
            ]
        )
    }
}


