import {COMMON_HTML} from "../constants/templets.js";

export class View {
    constructor() {
        this.init();
    }

    init(){
        this.renderCommon();
    }

    renderCommon(){
        const $app = document.querySelector('#app');
        $app.innerHTML = COMMON_HTML;
    }
}