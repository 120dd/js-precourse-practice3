import {VendingMachine} from "../model/vendingMachine.js";
import {View} from "../view/index.js";

export class Controller {
    constructor() {
        this.init();
    }

    init(){
        this.vendingMachine = new VendingMachine();
        this.view = new View();
    }
}