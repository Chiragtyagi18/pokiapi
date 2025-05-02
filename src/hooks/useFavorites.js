import { useState, useEffect } from "react";

// Custom hook for managing favorite Pokémon
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (pokemon) => {
    const newFavorites = favorites.some((fav) => fav.id === pokemon.id)
      ? favorites.filter((fav) => fav.id !== pokemon.id)
      : [...favorites, pokemon];

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
