export class View {
    constructor() {
        this.init();
    }

    init(){
        this.renderCommon();
    }

    renderCommon(){
        const $app = document.querySelector('#app');
        $app.innerHTML = `<div>hello world!</div>`;
    }
}