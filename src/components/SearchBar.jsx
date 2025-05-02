import React from "react";
import "./style.css"; 
const SearchBar = ({ value, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={value}
      onChange={onSearch}
      className="search-input"
    />
  );
};

export default SearchBar;
