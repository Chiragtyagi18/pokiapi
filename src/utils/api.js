
export const fetchPokemonBatch = async (count = 150) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`);
  const data = await response.json();

  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();

      return {
        id: details.id,
        name: details.name,
        types: details.types.map((t) => t.type.name),
        image: details.sprites.front_default,
        stats: details.stats,
        abilities: details.abilities.map((a) => a.ability.name),
        moves: details.moves.map((m) => m.move.name),
      };
    })
  );

  return detailedPokemon;
};

export const fetchEvolutionChain = async (pokemonId) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  const data = await response.json();

  const evolutionChainUrl = data.evolution_chain.url;
  const evolutionChainRes = await fetch(evolutionChainUrl);
  const evolutionChainData = await evolutionChainRes.json();

  return evolutionChainData;
};

// NEW: Fetch details for a single Pokémon by ID
export const fetchPokemonDetails = async (pokemonId) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const details = await response.json();

  return {
    id: details.id,
    name: details.name,
    types: details.types.map((t) => t.type.name),
    image: details.sprites.front_default,
    stats: details.stats,
    abilities: details.abilities.map((a) => a.ability.name),
    moves: details.moves.map((m) => m.move.name),
  };
};
