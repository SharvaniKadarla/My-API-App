"use client";
import React, { useState, useContext, useEffect } from "react";
import { PokemonContext } from "../context/PokemonContext.jsx";

export default function Electric() {
  const { pokemonsByType, loadPokemons, loading } = useContext(PokemonContext);
  const [pokemon, setPokemon] = useState(null);

  // Load Pokémon data from context when page loads
  useEffect(() => {
    loadPokemons();
  }, []);

  async function fetchRandomElectricPokemon() {
    const electricList = pokemonsByType.electric;
    if (!electricList || electricList.length === 0) {
      console.warn("Electric Pokémon not loaded yet");
      return;
    }

    const randomIndex = Math.floor(Math.random() * electricList.length);
    const selected = electricList[randomIndex];

    const detailsRes = await fetch(selected.url);
    const details = await detailsRes.json();

    const info = {
      name: details.name,
      sprite: details.sprites.front_default,
      abilities: details.abilities.map((a) => a.ability.name),
      stats: details.stats.map((s) => ({
        name: s.stat.name,
        base: s.base_stat,
      })),
    };

    setPokemon(info);
  }

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundImage: "url('/electric_background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        textShadow: "1px 1px 2px black",
        fontFamily: "Comic Sans MS, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ⚡ Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15px",
          marginBottom: "10px",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "4rem" }}>⚡</span>
        <img
          src="/pokemon_logo.png"
          alt="Electric Pokémon Logo"
          style={{
            width: "280px",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))",
          }}
        />
      </div>

      {/* Electric Pokéball */}
      <div
        onClick={fetchRandomElectricPokemon}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
          transform: loading ? "scale(0.9)" : "scale(1)",
          transition: "transform 0.25s ease-in-out",
        }}
      >
        <img
          src="/electric_ball_voltorb.png"
          alt="Electric Pokéball"
          style={{
            width: "90px",
            height: "90px",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.6))",
          }}
        />
      </div>

      <p style={{ marginTop: "8px", fontSize: "17px" }}>
        {loading ? "Loading..." : "Click the Pokéball to see an Electric Pokémon!"}
      </p>

      {/* Pokémon info */}
      {pokemon && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "15px",
            flexWrap: "nowrap",
            width: "95%",
            maxWidth: "950px",
          }}
        >
          {/* Left — Stats */}
          <div
            style={{
              flex: "1",
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: "20px",
              padding: "15px",
              textAlign: "left",
              backdropFilter: "blur(6px)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
              fontSize: "20px",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "8px" }}>📊 Stats</h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.5em" }}>
              {pokemon.stats.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}</strong>: {s.base}
                </li>
              ))}
            </ul>
          </div>

          {/* Middle — Image + Name */}
          <div
            style={{
              flex: "1",
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: "20px",
              padding: "10px",
              textAlign: "center",
              backdropFilter: "blur(6px)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h2
              style={{
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "1.6rem",
                margin: 0,
              }}
            >
              {pokemon.name}
            </h2>
          </div>

          {/* Right — Abilities */}
          <div
            style={{
              flex: "1",
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: "20px",
              padding: "15px",
              textAlign: "left",
              backdropFilter: "blur(6px)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
              fontSize: "20px",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "8px" }}>✨ Abilities</h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.5em" }}>
              {pokemon.abilities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
