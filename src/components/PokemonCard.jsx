import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const PokemonCard = ({ pokemon, onSelect, onFavoriteClick, isSelected, showDetailsButton }) => {
  const handleCardClick = (e) => {
    // Prevent card selection when clicking inside the favorite or detail buttons
    if (e.target.closest("button")) return;
    if (onSelect) onSelect(pokemon);
  };

  return (
    <div
      className={`pokemon-card ${isSelected ? "selected" : ""}`}
      onClick={handleCardClick}
    >
      <p className="pokemon-id">#{pokemon.id}</p>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>{pokemon.types.join(", ")}</p>

      <button onClick={() => onFavoriteClick && onFavoriteClick(pokemon)}>
        {pokemon.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      {showDetailsButton && (
        <Link to={`/pokemon/${pokemon.id}`}>
          <button className="details-button">View Details</button>
        </Link>
      )}
    </div>
  );
};

export default PokemonCard;
