"use client";
import React, { useContext, useEffect } from "react";
import { PokemonContext } from "./context/PokemonContext.jsx";

export default function Home() {
  const { pokemonList, loadPokemon, loading } = useContext(PokemonContext);

  useEffect(() => {
    loadPokemon();
    console.log(pokemonList);
  }, []);

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        pokemonList?.map((p) => <h1 key={p.name}>{p.name}</h1>)
      )}
    </main>
  );
}
