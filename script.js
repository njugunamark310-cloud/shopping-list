const form = document.querySelector("#item-form");
const itemName = document.querySelector("#item-name");
const itemPrice = document.querySelector("#item-price");
const shoppingList = document.querySelector("#shopping-list");
const totalCost = document.querySelector("#total-cost");

let total = 0;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = itemName.value.trim();
    const price = Number(itemPrice.value);

    const li = document.createElement("li");
