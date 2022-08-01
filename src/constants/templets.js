export const $app = document.querySelector("#app");
export const $productTab = document.createElement("div");
export const $chargeCoinTab = document.createElement("div");

export const COMMON_HTML = `
<h1>
    ㅁㅁㅁ
</h1>
<div class="tab-buttons">
    <button id = "product-add-menu">상품 관리</button>
    <button id = "vending-machine-manage-menu">잔돈 충전</button>
    <button id = "product-purchase-menu">상품 구매</button>
</div>
`;

export const PRODUCT_MANAGE_TAB = `
<h2>상품 추가하기</h2>
<input id="product-name-input" type="text">
<input id="product-price-input" type="number">
<input id="product-quantity-input" type="number">
<button id="product-add-button">추가하기</button>
<h2>상품 현황</h2>
<table border="1">
<tr>
<th>상품명</th>
<th>개수</th>
<th>수량</th>
</tr>
</table>
`;

export const CHARGE_COIN_TAB = `
<h3>자판기 동전 충전하기</h3>
<input type="number">
<button>충전하기</button>
<h3>동전 보유 현황</h3>
<table border="1">
    <tr>
        <th>동전</th>
        <th>개수</th>
    </tr>
    <tr>
        <th>500원</th>
        <th></th>
    </tr>
    <tr>
        <th>100원</th>
        <th></th>
    </tr>
    <tr>
        <th>50원</th>
        <th></th>
    </tr>
    <tr>
        <th>10원</th>
        <th></th>
    </tr>
</table>
`;
