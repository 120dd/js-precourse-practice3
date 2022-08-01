export const $app = document.querySelector("#app");
export const $productTab = document.createElement("div");
export const $chargeCoinTab = document.createElement("div");
export const $productPurchaseTab = document.createElement("div");

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
<form>
    <input id="product-name-input" type="text">
    <input id="product-price-input" type="number">
    <input id="product-quantity-input" type="number">
    <button id="product-add-button">추가하기</button>
</form>
<h2>상품 현황</h2>
<table border="1">
<tr>
<th>상품명</th>
<th>개수</th>
<th>수량</th>
</tr>
<!--상품 추가될 때 아이디값 부여하기-->
</table>
`;

export const CHARGE_COIN_TAB = `
<h3>자판기 동전 충전하기</h3>
<input type="number" id="vending-machine-charge-input">
<button id="vending-machine-charge-button">충전하기</button>
<h3>동전 보유 현황</h3>
<table border="1" id="vending-machine-charge-amount">
    <tr>
        <th>동전</th>
        <th>개수</th>
    </tr>
    <tr>
        <th>500원</th>
        <th id="vending-machine-coin-500-quantity"></th>
    </tr>
    <tr>
        <th>100원</th>
        <th id="vending-machine-coin-100-quantity"></th>
    </tr>
    <tr>
        <th>50원</th>
        <th id="vending-machine-coin-50-quantity"></th>
    </tr>
    <tr>
        <th>10원</th>
        <th id="vending-machine-coin-10-quantity"></th>
    </tr>
</table>
`;

export const PRODUCT_PURCHASE_TAB = `
<h3>금액 투입</h3>
<input type="number" id="charge-input">
<button id="charge-button">투입하기</button>
<p id="charge-amount">투입한금액:</p>
<h3>구매할 수 있는 상품 현황</h3>
<table border="1">
<tr>
<th>상품명</th>
<th>개수</th>
<th>수량</th>
<th>구매</th>
</tr>
<!--상품 추가될 때 아이디값 부여하기-->
</table>
<h3>잔돈</h3>
<button id="coin-return-button">반환하기</button>
<table border="1">
    <tr>
        <th>동전</th>
        <th>개수</th>
    </tr>
    <tr>
        <th>500원</th>
        <th id="coin-500-quantity"></th>
    </tr>
    <tr>
        <th>100원</th>
        <th id="coin-100-quantity"></th>
    </tr>
    <tr>
        <th>50원</th>
        <th id="coin-50-quantity"></th>
    </tr>
    <tr>
        <th>10원</th>
        <th id="coin-10-quantity"></th>
    </tr>
    <!--상품 추가될 때 아이디값 부여하기-->
</table>
`;
