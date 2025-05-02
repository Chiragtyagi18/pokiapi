
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetails } from "../utils/api";
import "./Detail.css";

const Detail = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchPokemonDetails(pokemonId);
      setPokemon(data);
    };
    fetchDetails();
  }, [pokemonId]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.some((p) => p.id === pokemon.id);

    const updatedFavorites = isFavorite
      ? favorites.filter((p) => p.id !== pokemon.id)
      : [...favorites, pokemon];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!pokemon) return <p>Loading...</p>;

  const isFavorite = JSON.parse(localStorage.getItem("favorites"))?.some(
    (p) => p.id === pokemon.id
  );

  return (
    <div className="detail-container">
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <img src={pokemon.image} alt={pokemon.name} />

      <div className="stats">
        <p><strong>ID:</strong> {pokemon.id}</p>
        <p><strong>Types:</strong> {pokemon.types.join(", ")}</p>
        <p><strong>Abilities:</strong> {pokemon.abilities.join(", ")}</p>
        <p><strong>Stats:</strong></p>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name.toUpperCase()}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default Detail;
