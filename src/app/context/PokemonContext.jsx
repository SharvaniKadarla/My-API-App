"use client";
import React, { createContext, useState } from "react";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadPokemon() {
    try {
      setLoading(true);
      const res = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await res.json();
      console.log("Fetched data:", data.results); // 👈 this will help us check
      setPokemonList(data.results);
    } catch (err) {
      console.error("Error fetching pokemon:", err);
    } finally {
      setLoading(false);
    }
  }

  const contextValue = {
    pokemonList,
    loading,
    loadPokemon,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
}
