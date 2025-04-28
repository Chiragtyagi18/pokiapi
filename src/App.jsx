import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import Loader from './components/Loader';
import Error from './components/Error';
import './components/style.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (err) {
        setError('Failed to fetch Pokémon.');
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (typeFilter) {
      filtered = filtered.filter(p =>
        p.types.some(t => t.type.name === typeFilter)
      );
    }
    setFilteredPokemons(filtered);
  }, [search, typeFilter, pokemons]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="app-container">
      <Header />
      <SearchBar
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
};

export default App;
