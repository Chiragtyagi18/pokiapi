
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import Pagination from "../components/Pagination";
import PokemonCard from "../components/PokemonCard";
import usePokemonList from "../hooks/usePokemonList";
import CompareTool from "../components/CompareTool";
import { FavoritesContext } from "../contexts/FavoritesContext"; // ✅ Import context

const Home = () => {
  const {
    pokemonList,
    loading,
    searchTerm,
    setSearchTerm,
    selectedTypes,
    setSelectedTypes,
    sortOption,
    setSortOption,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePokemonList();

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext); // ✅ Get context

  const [selectedPokemonA, setSelectedPokemonA] = useState(null);
  const [selectedPokemonB, setSelectedPokemonB] = useState(null);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleTypeFilter = (types) => setSelectedTypes(types);
  const handleSort = (e) => setSortOption(e.target.value);
  const changePage = (newPage) => setCurrentPage(newPage);

  const handleSelectPokemon = (pokemon) => {
    if (selectedPokemonA?.id === pokemon.id) {
      setSelectedPokemonA(null);
    } else if (selectedPokemonB?.id === pokemon.id) {
      setSelectedPokemonB(null);
    } else if (!selectedPokemonA) {
      setSelectedPokemonA(pokemon);
    } else if (!selectedPokemonB) {
      setSelectedPokemonB(pokemon);
    } else {
      setSelectedPokemonA(pokemon);
      setSelectedPokemonB(null);
    }
  };

  const handleFavoriteClick = (pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Pokémon Explorer</h1>

      <div className="home-controls">
        <SearchBar value={searchTerm} onSearch={handleSearch} />

        <Link to="/favorites">
          <button style={{ backgroundColor: 'rgb(152, 230, 34)'}} className="favorite-button">View Favorite Pokémon</button>
        </Link>

        <TypeFilter selectedTypes={selectedTypes} onChange={handleTypeFilter} />

        <select value={sortOption} onChange={handleSort}>
          <option value="id">ID</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : pokemonList?.length > 0 ? (
        <div className="home-grid">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={handleSelectPokemon}
              onFavoriteClick={handleFavoriteClick} // ✅ Handle favorites
              isFavorite={isFavorite}               // ✅ Mark if favorite
              isSelected={
                pokemon.id === selectedPokemonA?.id || pokemon.id === selectedPokemonB?.id
              }
              showDetailsButton={true}              // ✅ Show "View Details"
            />
          ))}
        </div>
      ) : (
        <p>No Pokémon found.</p>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={changePage} />

      {selectedPokemonA && selectedPokemonB && (
        <CompareTool pokemonA={selectedPokemonA} pokemonB={selectedPokemonB} />
      )}
    </div>
  );
};

export default Home;
