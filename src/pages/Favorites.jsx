
import React, { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import PokemonCard from "../components/PokemonCard";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const handleFavoriteClick = (pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <div className="favorites-container">
      <h1>Your Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onFavoriteClick={handleFavoriteClick}
              showDetailsButton={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
