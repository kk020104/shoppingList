let shoppingListExpanded = false;
const shoppingList = [];
const shoppingListTable = document.getElementById("shopping-list");
const itemCountSpan = document.getElementById("item-count");
const popup = document.getElementById("popup");

// Toggle shopping list view
function toggleShoppingList() {
    shoppingListExpanded = !shoppingListExpanded;
    if (shoppingListExpanded) {
        shoppingListTable.classList.add("expanded");
        shoppingListTable.classList.remove("collapsed");
    } else {
        shoppingListTable.classList.add("collapsed");
        shoppingListTable.classList.remove("expanded");
    }
    itemCountSpan.textContent = `(${shoppingList.length})`;
}

// Add an item to the shopping list from the popup input fields
function addItem() {
    const itemName = document.getElementById("item-name").value;
    const quantity = document.getElementById("quantity").value;
    if (itemName && quantity) {
        shoppingList.push({ name: itemName, quantity });
        updateShoppingList();
        itemCountSpan.textContent = `(${shoppingList.length})`;
    }
    closePopup();
    document.getElementById("item-name").value = "";
    document.getElementById("quantity").value = "";
}

// Update the shopping list display
function updateShoppingList() {
    const tbody = shoppingListTable.querySelector("tbody");
    tbody.innerHTML = "";
    shoppingList.forEach((item, index) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        const quantityCell = document.createElement("td");
       
        nameCell.textContent = item.name;
        quantityCell.textContent = item.quantity;

        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = () => removeItem(index);
        deleteCell.appendChild(deleteButton);
        
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(deleteCell);
        tbody.appendChild(row);
    });
}

// Remove an item from the shopping list
function removeItem(index) {
    shoppingList.splice(index, 1);
    updateShoppingList();
    itemCountSpan.textContent = `(${shoppingList.length})`;
}


// Show popup to add an item
function showAddItemPopup() {
    popup.classList.remove("hidden");
}

// Close the add item popup
function closePopup() {
    popup.classList.add("hidden");
}


// init
document.addEventListener("DOMContentLoaded", displayRecommendedItems);
