import './style.css';
const PokemonCard = ({ pokemon }) => (
  <div className="pokemon-card">
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
    <p>ID: {pokemon.id}</p>
    <div className="types">
      {pokemon.types.map(({ type }) => (
        <span key={type.name} className={`type ${type.name}`}>
          {type.name}
        </span>
      ))}
    </div>
  </div>
);

export default PokemonCard;
