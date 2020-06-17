// Storage Controller
const StorageCtrl = (function () {
  // Public methods
  return {
    storeItem: function (item) {
      let items;
      // Check if any items in ls
      if (localStorage.getItem("items") === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set ls
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem("items"));

        // Push new item
        items.push(item);

        // Re set ls
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsFromStorage: function () {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
    updateItemStorage: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach(function (item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteItemFromStorage: function (id) {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach(function (item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    clearItemsFromStorage: function () {
      localStorage.removeItem("items");
    },
  };
})();

// Item Controller

const ItemCtrl = (function () {
  // Item constructur

  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // DATA STUCRUTRE // State

  const data = {
    // Items: [
    //   // { id: 0, name: "لحم ستيك", calories: 1200 },
    //   // { id: 1, name: "كيك", calories: 400 },
    //   // { id: 2, name: "بيض", calories: 180 },
    // ],
    Items: [], //StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };
  // Public Methods ..
  return {
    getItems: function () {
      return data.Items;
    },

    logData: function () {
      return data;
    },
    addItem: function (name, calories) {
      console.log(name, calories);
      let ID;
      // Create An ID ..
      if (data.Items.length > 0) {
        ID = data.Items[data.Items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);
      // Create new item
      newItem = new Item(ID, name, calories);
      // Add to new item
      data.Items.push(newItem);
      return newItem;
    },
    getTotalCalories: function () {
      let total = 0;

      data.Items.forEach((item) => {
        // Loop through items & add cals .
        total += item.calories;
      });

      // Set total cal in data structure
      data.totalCalories = total;
      // Return
      return data.totalCalories;
    },
    getItemById: function (id) {
      let found = null;
      // loop through items
      data.Items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },
    updateItem: function (name, calories) {
      // Calories to Number
      calories = parseInt(calories);

      let found = null;

      data.Items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    deleteItem: function (id) {
      // Get ids
      const ids = data.Items.map(function (item) {
        return item.id;
      });

      // Get the index
      const index = ids.indexOf(id);

      // Remove item
      data.Items.splice(index, 1);
    },
    clearAllItems: function () {
      data.Items = [];
    },

    setCurrentITem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
  };
})();

// UI Controler

const UICtrl = (function () {
  const UISelectors = {
    ItemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    clearBtn: ".clear-btn",
    backBtn: ".back-btn",
  };
  // Public Methods ..

  return {
    populateItemList: function (items) {
      let html = "";
      items.forEach((item) => {
        html += ` <li class="collection-item" id="item-${item.id}">
<strong>  " ${item.name} " يوجد فيه</strong> <em> : ${item.calories} سعره حراريه </em>
<a href="#"  class="secondary-content">
  <i class="edit-item fa fa-pencil"></i>
</a>
</li>
`;
      });

      // Insert list items
      document.querySelector(UISelectors.ItemList).innerHTML = html;
    },
    getSelectores: function () {
      return UISelectors;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },

    addListItem: function (item) {
      //Show the List
      document.querySelector(UISelectors.ItemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      // Add a class
      li.className = "collection-item";
      // Add an ID
      li.id = `item-${item.id}`;
      // add Html
      li.innerHTML = `<strong>  " ${item.name} " يوجد فيه</strong> <em> : ${item.calories} سعره حراريه </em>
      <a href="#"  class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // insert ITem
      document
        .querySelector(UISelectors.ItemList)
        .insertAdjacentElement("beforeend", li);
    },
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into arry
      listItems = Array.from(listItems);

      // Loop through
      listItems.forEach((listItems) => {
        const itemID = listItems.getAttribute("id");
        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
          <strong>  " ${item.name} " يوجد فيه</strong> <em> : ${item.calories} سعره حراريه </em>
          <a href="#"  class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function () {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;

      UICtrl.showEditState();
    },
    hideList: function () {
      document.querySelector(UISelectors.ItemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach((item) => {
        item.remove();
      });
    },
  };
})();

// App Controler
const App = (function (ItemCtrl, UICtrl) {
  // Load All Event Listeners ..

  const loadEventListners = function () {
    // Getting the UI Selcetores ..
    const UISelectors = UICtrl.getSelectores();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", addItemSubmit);

    // Disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //Edit Icon Event ..
    document
      .querySelector(UISelectors.ItemList)
      .addEventListener("click", ItemEditClick);
    // Update item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", ItemUpdateSubmit);

    // Delete item event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", ItemDeleteSubmit);

    // Clear all button
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);

    // Back Button
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);
  };

  // Add item submit
  const addItemSubmit = function (e) {
    e.preventDefault();
    const Input = UICtrl.getItemInput();
    // Check for name and calories
    if (Input.name !== "" && Input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(Input.name, Input.calories);
    }
    // Add to UI list
    UICtrl.addListItem(newItem);

    // Get Total Calories

    const totalCalories = ItemCtrl.getTotalCalories();

    // Show total in the UI

    UICtrl.showTotalCalories(totalCalories);

    // Store in LS

    // StorageCtrl.storeItem(newItem);

    // Clear fields
    UICtrl.clearInput();
  };

  // Item Edit Submit Event .. // .. //
  const ItemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list item ID

      const listID = e.target.parentNode.parentNode.id;
      // Break into array
      const listIDArr = listID.split("-");
      // Get actuall ID
      const id = parseInt(listIDArr[1]);
      // get item
      const itemToEdit = ItemCtrl.getItemById(id);
      // Set current item
      ItemCtrl.setCurrentITem(itemToEdit);
      // Add Item to form
      UICtrl.addItemToForm();
      e.preventDefault();
    }
  };
  // Item Update Submit
  const ItemUpdateSubmit = function (e) {
    //  Get Item Input
    const input = UICtrl.getItemInput();

    // Update Item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get Total Calories

    const totalCalories = ItemCtrl.getTotalCalories();

    // Show total in the UI

    UICtrl.showTotalCalories(totalCalories);

    // Update to LS

    // StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Item delete submit
  const ItemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  };
  // Clear all Items
  const clearAllItemsClick = function (e) {
    // delete all items from data strucure
    ItemCtrl.clearAllItems();

    // Get Total Calories

    const totalCalories = ItemCtrl.getTotalCalories();

    // Show total in the UI

    UICtrl.showTotalCalories(totalCalories);
    // Remove from UI ..
    UICtrl.removeItems();

    // Hide list
    UICtrl.hideList();
    e.preventDefault();
  };

  // Public methods ..
  return {
    init: function () {
      // clear edit stste / set init state
      UICtrl.clearEditState();

      // Fetch Item from Data structre ..
      const items = ItemCtrl.getItems();
      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate  list with items
        UICtrl.populateItemList(items);
      }

      // Load event listeners ..
      loadEventListners();
      // Get Total Calories

      const totalCalories = ItemCtrl.getTotalCalories();

      // Show total in the UI

      UICtrl.showTotalCalories(totalCalories);
    },
  };

  // Load event Listeners
})(ItemCtrl, UICtrl);

// Initialzing

App.init();
