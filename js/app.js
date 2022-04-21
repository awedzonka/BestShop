window.addEventListener('DOMContentLoaded', function () {
    setInputProduct();
    setInputOrders();
    setChoosePackage();
    setAccounting();
    setRentalOfPaymentTerminal();
    setResult();
});


function setInputProduct() {
    const basedProductPrice = 0.5;

    const productInput = document.querySelector("input#product-quantity");//wyszukany input
    const liProduct = document.querySelector("li#li-product");// wyszukany li, w nim sa spany
    liProduct.style.display = "none"; //chowamy li

    const productItemCalc = document.querySelector("li#li-product .item-calc"); // środkowy span w li
    const productPrice = document.querySelector("li#li-product .price"); // trzeci span w li

    productInput.addEventListener("input", function (event) {

        if (productInput.value) {
            notMinus(productInput);
            liProduct.style.display = "flex"; // jeżli jets value to li się pokazuje
            productItemCalc.innerHTML = productInput.value + " * $" + basedProductPrice;  // do środkowego spana wrzucamy równanie vakue+zmienna ceny, jako napis
            productPrice.innerHTML = "$" + (productInput.value * basedProductPrice);// w trzecim spanie jest wynik powyższego równania
        }
        if (!productInput.value) { //jezli nie ma value, czyli ic nie wpiszemy
            productPrice.innerHTML = 0; // środkowy span równy 0
            liProduct.style.display = "none"; // i li jest ukrywane
        }
    })
}

function setInputOrders() {

    const basedOrdersPrice = 0.25;

    const ordersInput = document.querySelector("input#orders-in-month"); ///szukamy inputa
    const liOrders = document.querySelector("li#li-orders"); //szukamy drugiego li, poniżej ukrywamy go
    liOrders.style.display = "none";

    const orderItemCalc = document.querySelector("li#li-orders .item-calc"); //szukamy drugiego spana w li
    const orderPrice = document.querySelector("li#li-orders .price"); // szukamy tzreciego spana w li

    ordersInput.addEventListener("input", function (event) {
        if (ordersInput.value) { //jeżeli w input jest value
            notMinus(ordersInput);
            liOrders.style.display = "flex"; //pokaż li
            orderItemCalc.innerHTML = ordersInput.value + " * $" + basedOrdersPrice; // wpisz w drugim spanie równie
            orderPrice.innerHTML = "$" + (ordersInput.value * basedOrdersPrice); //wyświetl wynik tego równani w trzecim spanie
        }
        if (!ordersInput.value || ordersInput.value <= 0) {    //jeżeli nie ma value
            ordersInput.innerHTML = 0;
            liOrders.style.display = "none";
        }
    })
}

function setChoosePackage() {
    const choosePackage = document.querySelector("select#choose-package");
    const liPackage = document.querySelector("li#li-package");
    liPackage.style.display = "none";
    const packageItemCalc = document.querySelector("li#li-package .item-calc");
    const packagePrice = document.querySelector("li#li-package .price");

    choosePackage.addEventListener("change", function () {
        if (choosePackage.value) {
            liPackage.style.display = "flex";
            packageItemCalc.innerHTML = choosePackage.value;
        }
        if (!choosePackage.value || choosePackage.value === "-1") {
            liPackage.style.display = "none"
        }
        priceProvider();

        function priceProvider() {
            if (choosePackage.value === "basic") {
                packagePrice.innerHTML = "$30";
            }
            if (choosePackage.value === "professional") {
                packagePrice.innerHTML = "$60";
            }
            if (choosePackage.value === "premium") {
                packagePrice.innerHTML = "$100";
            }
            if (choosePackage.value === "-1") {
                packagePrice.innerHTML = "$0";
            }
        }
    })
}

function setAccounting() {
    const basedAccountingPrice = 35;

    const inputAccounting = document.querySelector("#accounting");
    const liAccounting = document.querySelector("li#li-accounting");
    const accoutingPrice = document.querySelector("li#li-accounting .price");
    liAccounting.style.display = 'none';

    inputAccounting.addEventListener("click", function () {
        if (inputAccounting.checked) {
            liAccounting.style.display = 'flex';
            accoutingPrice.innerHTML = "$" + basedAccountingPrice;
            return;
        }
        liAccounting.style.display = 'none';
        accoutingPrice.innerHTML = "$0";

    })
}

function setRentalOfPaymentTerminal() {
    const basedTerminalPrice = 45;

    const inputTerminal = document.querySelector("#payment-terminal");
    const liTerminal = document.querySelector("li#li-terminal");
    const terminalPrice = document.querySelector("li#li-terminal .price");
    liTerminal.style.display = 'none';

    inputTerminal.addEventListener("click", function () {
        if (inputTerminal.checked) {
            liTerminal.style.display = 'flex';
            terminalPrice.innerHTML = "$" + basedTerminalPrice;
            return;
        }
        liTerminal.style.display = 'none';
        terminalPrice.innerHTML = "$0";
    })
}

function setResult() {
    const form = document.querySelector("form#calc-form");
    const prices = document.querySelectorAll("#result-data-form ul .price");
    const totalPrice = document.querySelector("#total-price .total-price-result");

    const events = ["input", "click", "change"];

    events.forEach(function (el) {
        form.addEventListener(el, function () {
            set();
        });
    });

    function set() {
        let result = 0;
        prices.forEach(function (el) {
            result += +el.innerHTML.replace("$", "");
        })
        totalPrice.innerHTML = "$" + result;
    }
}

function notMinus(input) {
    if (input.value < 0) {
        input.value = 0;
    }
}
