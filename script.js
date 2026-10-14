const clearButton = document.querySelector("#clear-list");
const form = document.querySelector("#item-form");
const itemName = document.querySelector("#item-name");
const itemPrice = document.querySelector("#item-price");
const shoppingList = document.querySelector("#shopping-list");
const totalCost = document.querySelector("#total-cost");
// corrected area
let items = [];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = itemName.value.trim();
    const price = Number(itemPrice.value);

    const li = document.createElement("li");

    const itemDetails = document.createElement("span");
    itemDetails.textContent = `${name} - KSh ${price.toFixed(2)}`;

    const purchaseButton = document.createElement("button");
    purchaseButton.type = "button";
    purchaseButton.textContent = "Mark as Purchased";

     purchaseButton.addEventListener("click", function () {
        const purchased = li.classList.toggle("purchased");

        if (purchased) {
            total += price;
            purchaseButton.textContent = "Purchased!";
        } else {
            total -= price;
            purchaseButton.textContent = "Mark as Purchased";
        }

        totalCost.textContent = total.toFixed(2);
    });

    li.appendChild(itemDetails);
    li.appendChild(purchaseButton);
    shoppingList.appendChild(li);

     form.reset();
});


clearButton.onclick = function () {
    shoppingList.innerHTML = "";
    total = 0;
    totalCost.textContent = "0.00";
};

