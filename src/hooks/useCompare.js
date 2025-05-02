import { useState } from "react";

const useCompare = () => {
  const [selected, setSelected] = useState([]);

  const toggleCompare = (pokemon) => {
    setSelected((prev) => {
      if (prev.find((p) => p.id === pokemon.id)) {
        return prev.filter((p) => p.id !== pokemon.id);
      } else if (prev.length < 2) {
        return [...prev, pokemon];
      } else {
        return prev; // limit to 2
      }
    });
  };

  const clearCompare = () => setSelected([]);

  return {
    selected,
    toggleCompare,
    clearCompare,
    isSelected: (id) => selected.some((p) => p.id === id),
  };
};

export default useCompare;
