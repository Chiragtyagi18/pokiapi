import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === pokemon.id)) {
        return prevFavorites; // Don't add duplicates
      }
      return [...prevFavorites, pokemon];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter((pokemon) => pokemon.id !== id));
  };

  const isFavorite = (id) => favorites.some((pokemon) => pokemon.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
