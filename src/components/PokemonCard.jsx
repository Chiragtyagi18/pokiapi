import React, { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import "./style.css";

const PokemonCard = ({ pokemon, onSelect, isSelected }) => {
  const { id, name, image, types } = pokemon || {};

  if (!pokemon || !id || !image) return null;  // Ensure there's a valid pokemon object with an image

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const favorite = isFavorite(id);

  
  const handleClick = () => onSelect(pokemon);

  return (
    <div 
      className={`pokemon-card ${isSelected ? 'selected' : ''}`} 
      onClick={handleClick}
    >
      <img src={image} alt={name} />
      <h3>{name?.charAt(0).toUpperCase() + name?.slice(1)}</h3>
      <div className="pokemon-id">ID: {id}</div> {/* Display Pokémon ID */}
      <div className="pokemon-types">
        {types?.map((typeName) => (
          <span key={typeName}>{typeName}</span>
        ))}
      </div>
      <button onClick={() => (favorite ? removeFavorite(id) : addFavorite(pokemon))}>
        {favorite ? "★ Remove Favorite" : "☆ Add Favorite"}
      </button>
    </div>
  );
};

export default PokemonCard;
