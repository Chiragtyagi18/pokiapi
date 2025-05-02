

import { useEffect, useState, useMemo } from "react";
import { fetchPokemonBatch } from "../utils/api"; // Assuming this function is defined elsewhere

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("id");
  const [itemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonBatch();
      setPokemonList(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter Pokémon based on search term and selected types
  const filteredPokemon = useMemo(() => {
    return pokemonList
      .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((p) =>
        selectedTypes.length === 0
          ? true
          : selectedTypes.every((type) => p.types.includes(type)) // Updated for array of strings
      );
  }, [pokemonList, searchTerm, selectedTypes]);

  // Sort Pokémon based on selected sort option (ID or Name)
  const sortedPokemon = useMemo(() => {
    return [...filteredPokemon].sort((a, b) => {
      if (sortOption === "id") return a.id - b.id;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [filteredPokemon, sortOption]);

  // Paginate Pokémon list
  const paginatedPokemon = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedPokemon.slice(start, start + itemsPerPage);
  }, [sortedPokemon, currentPage, itemsPerPage]);

  // Calculate the total pages based on the number of filtered Pokémon
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  return {
    pokemonList: paginatedPokemon,
    searchTerm,
    setSearchTerm,
    selectedTypes,
    setSelectedTypes,
    sortOption,
    setSortOption,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
  };
};

export default usePokemonList;
