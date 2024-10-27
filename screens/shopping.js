const shoppingList = [];
const shoppingListTable = document.getElementById("shopping-list");
const itemCountSpan = document.getElementById("item-count");
const popup = document.getElementById("popup");
const inventory = [
    { name: "Milk", quantity: 1 },
    { name: "Eggs", quantity: 5 },
    { name: "Bread", quantity: 0 }
];

// Show popup to add an item
function showAddItemPopup() {
    popup.classList.remove("hidden");
}

// Close the add item popup
function closePopup() {
    popup.classList.add("hidden");
}

// Add an item to the shopping list from the popup input fields
function addItem() {
    const itemName = document.getElementById("item-name").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10);

    if (itemName && quantity > 0) {
        const existingItem = shoppingList.find(item => item.name.toLowerCase() === itemName.toLowerCase());
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            shoppingList.push({ name: itemName, quantity });
        }
        
        updateShoppingList();
        itemCountSpan.textContent = `(${shoppingList.length})`;
    }

    closePopup();
    document.getElementById("item-name").value = ""; // Clear input
    document.getElementById("quantity").value = ""; // Clear input
}

// Function to choose an item from inventory
function chooseFromInventory() {
    const selectedItem = prompt(
        "Choose an item to add from inventory:\n" + 
        inventory.map((item, index) => `${index + 1}. ${item.name} (${item.quantity})`).join("\n")
    );

    const index = parseInt(selectedItem) - 1;

    if (!isNaN(index) && inventory[index]) {
        const inventoryItem = inventory[index];
        const existingItem = shoppingList.find(item => item.name.toLowerCase() === inventoryItem.name.toLowerCase());

        if (existingItem) {
            existingItem.quantity += inventoryItem.quantity;
        } else {
            shoppingList.push({ name: inventoryItem.name, quantity: inventoryItem.quantity });
        }

        updateShoppingList();
        itemCountSpan.textContent = `(${shoppingList.length})`;
    }
}

// Update the shopping list display
function updateShoppingList() {
    const tbody = shoppingListTable.querySelector("tbody");
    tbody.innerHTML = ""; // Clear previous items

    shoppingList.forEach((item, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;

        const buttonCell = document.createElement("td");

        // Create the minus button
        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.classList.add("minus-button");
        minusButton.onclick = () => updateQuantity(index, -1);
        buttonCell.appendChild(minusButton);

        // Create the plus button
        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.classList.add("plus-button");
        plusButton.onclick = () => updateQuantity(index, 1);
        buttonCell.appendChild(plusButton);

        // Create the delete button
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

    // Remove the item if quantity falls below 1
    if (item.quantity <= 0) {
        shoppingList.splice(index, 1);
    }

    updateShoppingList();
    itemCountSpan.textContent = `(${shoppingList.length})`;
}

// Remove an item from the shopping list
function removeItem(index) {
    shoppingList.splice(index, 1);
    updateShoppingList();
    itemCountSpan.textContent = `(${shoppingList.length})`;
}

// Run initialization functions
document.addEventListener("DOMContentLoaded", () => {
    updateShoppingList();
});
