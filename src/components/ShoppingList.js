import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedItems, setUpdatedItems] = useState(items);
  const [search, setSerch] = useState("Search...")

  function onItemFormSubmit(newItem) {
    const newList = [...updatedItems, newItem];
    setUpdatedItems(newList);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  const itemsToDisplay = updatedItems.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  const searchResults = itemsToDisplay.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  })

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={onSearchChange} />

      <ul className="Items">
        {searchResults.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
