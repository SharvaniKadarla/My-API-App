// context/PokemonContext.jsx
"use client";
import React, { createContext, useState, useCallback, useMemo } from "react";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [pokemonsByType, setPokemonsByType] = useState({
    electric: [],
    fire: [],
    grass: [],
    water: [],
  });

  const fetchTypeList = useCallback(async (typeName) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}/`);
      if (!res.ok) throw new Error(`Failed type ${typeName}: ${res.status}`);
      const data = await res.json();
      return (data.pokemon || []).map((item) => item.pokemon); // { name, url }
    } catch (err) {
      console.error(`Error fetching data: ${err}`);
      return [];
    }
  }, []);

  const loadPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const [electric, fire, grass, water] = await Promise.all([
        fetchTypeList("electric"),
        fetchTypeList("fire"),
        fetchTypeList("grass"),
        fetchTypeList("water"),
      ]);
      setPokemonsByType({ fire, water, grass, electric });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [fetchTypeList]);

  const contextValue = useMemo(
    () => ({ loadPokemons, pokemonsByType, loading }),
    [loadPokemons, pokemonsByType, loading]
  );

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
}
