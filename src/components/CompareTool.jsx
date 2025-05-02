import React from "react";
import "./CompareTool.css";

const CompareTool = ({ pokemonA, pokemonB }) => {
  if (!pokemonA || !pokemonB) return <p>Select two Pokémon to compare.</p>;

  const stats = ["hp", "attack", "defense", "speed", "special-attack", "special-defense"];

  const getStat = (pokemon, statName) => {
    const stat = pokemon.stats.find((s) => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  return (
    <div className="compare-container">
      <h2>Comparison</h2>
      <div className="compare-row">
        <strong>Stat</strong>
        <span>{pokemonA.name}</span>
        <span>{pokemonB.name}</span>
      </div>
      {stats.map((stat) => (
        <div className="compare-row" key={stat}>
          <strong>{stat.toUpperCase()}</strong>
          <span>{getStat(pokemonA, stat)}</span>
          <span>{getStat(pokemonB, stat)}</span>
        </div>
      ))}
    </div>
  );
};

export default CompareTool;
