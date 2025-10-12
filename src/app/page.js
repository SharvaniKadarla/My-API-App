"use client";
import React, { useContext, useEffect } from "react";
import { PokemonContext } from "./context/PokemonContext.jsx";

export default function Home() {
  const { pokemonsByType, loadPokemons } = useContext(PokemonContext);

  useEffect(() => {
    loadPokemons();
    console.log(pokemonsByType);
  }, []);

  useEffect(() => {
    console.log("pokemonsByType updated:", pokemonsByType);
  }, [pokemonsByType]);

  return (
    <main>
      <section>
        <h2>⚡ Electric ({pokemonsByType.electric.length})</h2>
        <ul>
          {pokemonsByType.electric.slice(0, 12).map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>🔥 Fire ({pokemonsByType.fire.length})</h2>
        <ul>
          {pokemonsByType.fire.slice(0, 12).map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>🌿 Grass ({pokemonsByType.grass.length})</h2>
        <ul>
          {pokemonsByType.grass.slice(0, 12).map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>💧 Water ({pokemonsByType.water.length})</h2>
        <ul>
          {pokemonsByType.water.slice(0, 12).map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
