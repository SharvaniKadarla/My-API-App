"use client";
import React, { useContext, useEffect } from "react";
import { PokemonContext } from "../context/PokemonContext.jsx";
import Link from "next/link";
import "./water.css";

export default function Water() {
  const { pokemonsByType, loadPokemons, loading } = useContext(PokemonContext);

  useEffect(() => {
    loadPokemons(); // make sure water pokemons are loaded
  }, []);

  const waterPokemons = pokemonsByType.water || [];

  return (
    <main
      style={{
        padding: 20,
        minHeight: "100vh",
        backgroundImage: "url('/water_back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        textShadow: "1px 1px 2px black",
      }}
    >
      <h1>💧 Water Pokémon ({waterPokemons.length})</h1>

      {loading ? (
        <p>Loading Pokémon...</p>
      ) : waterPokemons.length === 0 ? (
        <p>No Pokémon found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {waterPokemons.slice(0, 40).map((p) => (
            <div
              key={p.name}
              style={{
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "12px",
                padding: "12px",
                textAlign: "center",
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              <p style={{ textTransform: "capitalize" }}>{p.name}</p>
            </div>
          ))}
        </div>
      )}

      <footer style={{ marginTop: 30 }}>
        <Link href="/" style={{ color: "white" }}>
          ← Back to Home
        </Link>
      </footer>
    </main>
  );
}
