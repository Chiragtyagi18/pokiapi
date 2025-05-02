import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const PokemonCard = ({
  pokemon,
  onSelect,
  onFavoriteClick,
  isSelected,
  showDetailsButton,
  isFavorite, // <-- Accept isFavorite function
}) => {
  const handleCardClick = (e) => {
    // Ignore clicks on buttons
    if (e.target.closest("button")) return;
    if (onSelect) onSelect(pokemon);
  };

  const favoriteStatus = isFavorite ? isFavorite(pokemon.id) : pokemon.isFavorite;

  return (
    <div
      className={`pokemon-card ${isSelected ? "selected" : ""}`}
      onClick={handleCardClick}
    >
      <p className="pokemon-id">#{pokemon.id}</p>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>{pokemon.types.join(", ")}</p>

      {onFavoriteClick && (
        <button onClick={(e) => {
          e.stopPropagation();
          onFavoriteClick(pokemon);
        }}>
          {favoriteStatus ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      )}

      {showDetailsButton && (
        <Link to={`/pokemon/${pokemon.id}`} onClick={(e) => e.stopPropagation()}>
          <button className="details-button">View Details</button>
        </Link>
      )}
    </div>
  );
};

export default PokemonCard;
