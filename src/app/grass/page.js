"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import "./grass.css";
import { PokemonContext } from "../context/PokemonContext.jsx";

export default function Grass() {
  const {
    loadPokemons,
    pokemonsByType,
    loading: ctxLoading,
  } = useContext(PokemonContext);

  const grassList = pokemonsByType.grass || [];
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  useEffect(() => {
    if (!grassList.length) {
      setDetails([]);
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const results = await Promise.all(
          grassList.map(async ({ url }) => {
            const res = await fetch(url, { signal: ctrl.signal });
            if (!res.ok) throw new Error(`Failed: ${res.status}`);
            const data = await res.json();

            // normalize
            const id = data.id;
            const name = data.name;
            const img =
              data?.sprites?.other?.["official-artwork"]?.front_default ||
              data?.sprites?.front_default ||
              "";
            const abilities = Array.from(
              new Set(data.abilities.map((a) => a.ability.name))
            );
            const heightM = (data.height ?? 0) / 10;
            const weightKg = (data.weight ?? 0) / 10;

            return { id, name, img, abilities, heightM, weightKg };
          })
        );

        results.sort((a, b) => a.id - b.id);
        setDetails(results);
      } catch (e) {
        if (e.name !== "AbortError") setError(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [grassList]);

  if (ctxLoading || loading) {
    return (
      <main className="grass__main">
        <h1>Loading…</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="grass__main">
        <h1 className="grass__error">
          {error.message || "Something went wrong."}
        </h1>
      </main>
    );
  }

  return (
    <div className="grass__wrapper">
      <main className="grass__main">
        {details.map((p) => (
          <GrassCard
            key={p.id}
            name={p.name}
            img={p.img}
            abilities={p.abilities}
            height={`${p.heightM} m`}
            weight={`${p.weightKg} kg`}
          />
        ))}
      </main>
    </div>
  );
}

function GrassCard({ name, img, abilities, height, weight }) {
  return (
    <article className="grass__card">
      <div className="grass__card--img-container">
        <img src={img} alt={`${name}`} className="grass__card--img" />
      </div>

      <h2 className="grass__card--title">{name}</h2>

      <div className="grass__card--hnw">
        <p>
          <span className="height">Height:</span>{" "}
          <span className="height-value">{height}</span>
        </p>
        <p>
          <span className="weight"> Weight:</span>{" "}
          <span className="weight-value">{weight}</span>
        </p>
      </div>

      <div className="grass__abilities">
        <p className="grass__abilities--title">Abilities</p>
        <ul className="grass__abilities--list">
          {abilities.map((a) => (
            <li key={a} className="grass__abilities--list-item">
              {a}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
