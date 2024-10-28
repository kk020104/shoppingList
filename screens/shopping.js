const shoppingListTable = document.getElementById("shopping-list");
const itemCountSpan = document.getElementById("item-count");
const popup = document.getElementById("popup");
const inventoryPopup = document.getElementById("inventory-popup");
const inventoryList = document.getElementById("inventory-list");

let shoppingList = loadShoppingListFromLocalStorage();


/* SAMPLE WIP INVENTORY, WILL GRAB THIS FROM OTHER PAGE... */
const inventory = [
    { name: "Milk", quantity: 1 },
    { name: "Eggs", quantity: 5 },
    { name: "Bread", quantity: 0 }
];





/* ===== Add button ====== */
function promptAdd() { popup.classList.remove("hidden"); }
function cancelAdd() { popup.classList.add("hidden"); }

/* Adds an item. If the name matches, the quantity will increase. */
function addItem() {
    const itemName = document.getElementById("item-name").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value.trim(), 10);
    // check if there is a name and quantity is greater than 0
    if (itemName && (quantity > 0)) {
        const existingItem = shoppingList.find(item => item.name.toLowerCase() === itemName.toLowerCase());
        existingItem ? existingItem.quantity += quantity : shoppingList.push({ name: itemName, quantity });
        updateShoppingList();
        itemCountSpan.textContent = `(${shoppingList.length})`;
        saveShoppingListToLocalStorage();
    }
    // close popup and clear input fields
    cancelAdd();
    document.getElementById("item-name").value = "";
    document.getElementById("quantity").value = "";
}






/* ===== Inventory button ===== */
function promptInven() { inventoryPopup.classList.remove("hidden"); populateInventoryList(); }
function cancelInven() { inventoryPopup.classList.add("hidden"); }

// populate inventory list in the popup
function populateInventoryList() {
    inventoryList.innerHTML = "";
    inventory.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} (Available: ${item.quantity})`;
        listItem.onclick = () => addItemFromInventory(index);
        inventoryList.appendChild(listItem);
    });
}

// Add an item from inventory to the shopping list
function addItemFromInventory(index) {
    const inventoryItem = inventory[index];
    const existingItem = shoppingList.find(item => item.name.toLowerCase() === inventoryItem.name.toLowerCase());
    existingItem ? existingItem.quantity += inventoryItem.quantity : shoppingList.push({ name: inventoryItem.name, quantity: inventoryItem.quantity });
    updateShoppingList();
    itemCountSpan.textContent = `(${shoppingList.length})`;
    saveShoppingListToLocalStorage();
    updateShoppingList();
    cancelInven();
}





/* ===== Shopping List (like the actual list) ===== */
function updateShoppingList() {
    const tbody = shoppingListTable.querySelector("tbody");
    tbody.innerHTML = "";
    shoppingList.forEach((item, index) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;
        const buttonCell = document.createElement("td");

        // Minus button
        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.classList.add("minus-button");
        minusButton.onclick = () => updateQuantity(index, -1);
        buttonCell.appendChild(minusButton);

        // Plus button
        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.classList.add("plus-button");
        plusButton.onclick = () => updateQuantity(index, 1);
        buttonCell.appendChild(plusButton);

        // Del button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = () => removeItem(index);
        buttonCell.appendChild(deleteButton);

        row.append(nameCell, quantityCell, buttonCell);
        tbody.appendChild(row);
    });
}

// Update the quantity of an item in the shopping list
function updateQuantity(index, change) {
    const item = shoppingList[index];
    item.quantity += change;
    if (item.quantity <= 0) { shoppingList.splice(index, 1); }
    saveShoppingListToLocalStorage();
    updateShoppingList();
    itemCountSpan.textContent = `(${shoppingList.length})`;
}

// Remove an item from the shopping list
function removeItem(index) {
    shoppingList.splice(index, 1);
    saveShoppingListToLocalStorage();
    updateShoppingList();
    itemCountSpan.textContent = `(${shoppingList.length})`;
}






/* ===== Saving Shopping list to local storage ===== */
function saveShoppingListToLocalStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

// Load the shopping list from local storage
function loadShoppingListFromLocalStorage() {
    const savedList = localStorage.getItem("shoppingList");
    return savedList ? JSON.parse(savedList) : [];
}



// init
document.addEventListener("DOMContentLoaded", () => {
    updateShoppingList();
});
