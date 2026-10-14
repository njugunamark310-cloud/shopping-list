const clearButton = document.querySelector("#clear-list");
const form = document.querySelector("#item-form");
const itemName = document.querySelector("#item-name");
const itemPrice = document.querySelector("#item-price");
const shoppingList = document.querySelector("#shopping-list");
const totalCost = document.querySelector("#total-cost");


let items = JSON.parse(localStorage.getItem("shoppingItems")) || [];


function saveItems() {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
}
//improved and corrected areas 
// Display items from the array
function renderItems() {
    shoppingList.innerHTML = "";
    let total = 0;

    items.forEach(function (item, index) {
        const li = document.createElement("li");

        const itemDetails = document.createElement("span");
        itemDetails.textContent =
            `${item.name} - KSh ${item.price.toFixed(2)}`;

        const purchaseButton = document.createElement("button");
        purchaseButton.type = "button";
        purchaseButton.textContent = item.purchased
            ? "Purchased!!"
            : "Mark as Purchased";

        li.classList.toggle("purchased", item.purchased);

        // Mark or unmarked items
        purchaseButton.addEventListener("click", function () {
            item.purchased = !item.purchased;
            saveItems();
            renderItems();
        });

        // Edit an item's name and the prices
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            const newName = prompt("Enter item name:", item.name);

            if (newName === null || newName.trim() === "") {
                return;
            }

            const newPrice = prompt("Enter item price:", item.price);

            if (newPrice === null || newPrice.trim() === "") {
                return;
            }

            if (isNaN(newPrice) || Number(newPrice) < 0) {
                alert("Enter a valid price.");
                return;
            }

            item.name = newName.trim();
            item.price = Number(newPrice);

            saveItems();
            renderItems();
        });

        li.appendChild(itemDetails);
        li.appendChild(purchaseButton);
        li.appendChild(editButton);
        shoppingList.appendChild(li);

        // Add purchased items to the total items
        if (item.purchased) {
            total += item.price;
        }
    });

    totalCost.textContent = total.toFixed(2);
}

// Adding a new item 
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = itemName.value.trim();
    const price = Number(itemPrice.value);

    if (name === "") {
        alert("Enter an item name.");
        return;
    }

    if (itemPrice.value.trim() === "" || isNaN(price) || price < 0) {
        alert("Enter a valid price.");
        return;
    }

    items.push({
        name: name,
        price: price,
        purchased: false
    });

    saveItems();
    renderItems();
    form.reset();
});

// Clear all items
clearButton.addEventListener("click", function () {
    items = [];
    saveItems();
    renderItems();
});

// Display saved items when the page loads(corrected)
renderItems();