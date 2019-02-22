$(function(){

    renderProduct('Сир', 101);
    renderProduct('Помідор', 3);
    renderProduct('Огірок', 1);
    renderProduct('Test', 3, true);

    $('#add-prod-button').click(function () {
        const $prod = $('#prod-input-field');
        renderProduct($prod.val());
        $prod.val("");
    });
});

function createProduct(prodName, prodQuantity = 1, bought = false) {
    const PROD_TEMPLATE = $("#prod-template");
    let prodQ = Math.max(prodQuantity, 1);

    const $badge1 = createProductBadge(prodName, prodQuantity);
    const $badge2 = $badge1.clone();
    $badge1.show();
    $("#to-buy-list").append($badge1);
    $("#bought-list").append($badge2);

    const $prod = PROD_TEMPLATE.clone();
    $prod.find(".col1").text(prodName);
    $prod.find(".col2 > div").text(prodQ);

    $prod.find(".minus").click(function () {
        if (prodQ <= 1) return;
        $prod.find(".col2 > div").text(--prodQ);
        $badge1.find(".circle").text(prodQ);
        $badge2.find(".circle").text(prodQ);
    });
    $prod.find(".plus").click(function () {
        $prod.find(".col2 > div").text(++prodQ);
        $badge1.find(".circle").text(prodQ);
        $badge2.find(".circle").text(prodQ);
    });

    $prod.find("#buy").click(function () {
        $prod.find("#plusminus").hide(200, "linear");
        $prod.find("#buy").hide(200, "linear");
        $prod.find("#del").hide(200, "linear");
        $prod.find("#unbuy").show(200, "linear");

        $prod.find(".col1").css("text-decoration-line", "line-through");

        $badge1.hide(300, "linear");
        $badge2.show(300, "linear");
    });
    $prod.find("#unbuy").click(function () {
        $prod.find("#plusminus").show(200, "linear");
        $prod.find("#buy").show(200, "linear");
        $prod.find("#del").show(200, "linear");
        $prod.find("#unbuy").hide(200, "linear");

        $prod.find(".col1").css("text-decoration-line", "none");

        $badge1.show(300, "linear");
        $badge2.hide(300, "linear");
    });
    $prod.find("#del").click(function () {
        $prod.hide(300, "linear");
        $badge1.hide(300, "linear");
        $badge2.hide();
    });

    $prod.find(".col2 > div").text(prodQuantity);

    if (bought) {
        $badge1.hide();
        $badge2.show();
        $prod.find("#buy").click();
    }

    return $prod;
}

function createProductBadge(prodName, prodQuantity = 1) {
    const BADGE_TEMPLATE = $("#badge-template");
    const prodQ = Math.max(prodQuantity, 1);

    const $badge = BADGE_TEMPLATE.clone();
    $badge.find("span").text(prodName);
    $badge.find(".circle").text(prodQ);
    return $badge;
}

function renderProduct(prodName, prodQuantity = 1, bought = false) {
    if (prodName === "") return;
    const $prod = createProduct(prodName, prodQuantity, bought);
    $('#prod-list').append($prod);
    $prod.show(200, "linear");
}