import PokemonCard from './PokemonCard';
import './style.css';

const PokemonList = ({ pokemons }) => {
  if (pokemons.length === 0) return <p>No Pokémon found.</p>;

  return (
    <div className="pokemon-list">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
