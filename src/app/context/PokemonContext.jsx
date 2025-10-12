"use client";
import React, { createContext, useState } from "react";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  // const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokemonsByType, setPokemonsByType] = useState({
    electric: [],
    fire: [],
    grass: [],
    water: [],
  });

  // Helper function to fetch list of a particular type of Pokemon
  async function fetchTypeList(typeName) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}/`);
      if (!res.ok) throw new Error(`Failed type ${typeName}: ${res.status}`);
      const data = await res.json();
      return (data.pokemon || []).map((item) => item.pokemon);
    } catch (err) {
      console.error(`Error fetching data: ${err}`);
      return [];
    }
  }

  // async function loadPokemon() {
  //   try {
  //     setLoading(true);
  //     const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  //     const data = await res.json();
  //     console.log("Fetched data:", data.results);
  //     setPokemonList(data.results);
  //   } catch (err) {
  //     console.error("Error fetching pokemon:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function loadPokemons() {
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
  }

  const contextValue = {
    // pokemonList,
    // loadPokemon,
    loadPokemons,
    pokemonsByType,
    loading,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
}
