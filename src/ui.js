export class Ui {
    /**
     * 받은 메세지로 경보를 울리는 함수
     * @param message
     */
    showAlert(message) {
        alert(message);
    }

    createTabButtons() {
        const tabDiv = document.createElement("div");
        document.querySelector('#app').appendChild(tabDiv);
        tabDiv.innerHTML = `
            <button id="product-add-menu">상품관리</button>
            <button id="vending-machine-manage-menu">잔돈충전</button>
            <button id="product-purchase-menu">상품구매</button>
        `
    }
}