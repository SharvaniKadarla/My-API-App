"use client";
import React, { useState, useEffect, useContext } from "react";
import { PokemonContext } from "../context/PokemonContext.jsx";
import "./fire.css";

export default function FirePage() {
  const { pokemonsByType, loadPokemons, loading: listLoading } = useContext(PokemonContext);
  const [fireEvolutions, setFireEvolutions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ensure Fire Pokémon list is loaded
  useEffect(() => {
    if (!pokemonsByType.fire || pokemonsByType.fire.length === 0) {
      loadPokemons();
    }
  }, []);

  async function fetchFireEvolution() {
    if (!pokemonsByType.fire || pokemonsByType.fire.length === 0) return;

    setLoading(true);

    try {
      const randomIndex = Math.floor(Math.random() * pokemonsByType.fire.length);
      const selected = pokemonsByType.fire[randomIndex];

      const speciesRes = await fetch(
        selected.url.replace("/pokemon/", "/pokemon-species/")
      );
      const speciesData = await speciesRes.json();

      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();

      const extractNames = (node) => [node.species.name, ...node.evolves_to.flatMap(extractNames)];
      const evoNames = extractNames(evoData.chain);

      const evoDetails = await Promise.all(
        evoNames.map(async (name) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await res.json();
          return {
            name,
            img: data.sprites.front_default,
            abilities: data.abilities.map((a) => a.ability.name),
            stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
          };
        })
      );

      setFireEvolutions(evoDetails);
    } catch (err) {
      console.error("Error fetching Fire evolution:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="fire-page">
      <h1>🔥 Fire Pokémon Evolution</h1>
      <button className="pokeball-btn" onClick={fetchFireEvolution}>
        Show Evolution
      </button>

      {(loading || listLoading) && <p className="loading-text">Loading...</p>}

      <div className="evolution-container">
        {fireEvolutions.map((p) => (
          <div key={p.name} className="flip-card">
            <div className="flip-card-inner">
              {/* Front of the card */}
              <div className="flip-card-front">
                <img src={p.img} alt={p.name} />
                <h3>{p.name}</h3>
              </div>
              {/* Back of the card */}
              <div className="flip-card-back">
                <h4>Abilities</h4>
                <ul>
                  {p.abilities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <h4>Stats</h4>
                <ul>
                  {p.stats.map((s) => (
                    <li key={s.name}>
                      {s.name}: {s.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
