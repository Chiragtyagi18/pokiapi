import React from "react";
import pokemonTypes from "../utils/pokemonTypes";
import "./TypeFilter.css";

const TypeFilter = ({ selectedTypes = [], onChange = () => {} }) => {
  const toggleType = (type) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onChange(newTypes);
  };

  return (
    <div className="type-filter">
      <h3>Filter by Type</h3>
      <div className="type-list">
        {pokemonTypes.map((type) => (
          <label key={type} className="type-checkbox">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TypeFilter;
