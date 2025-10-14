"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import "./grass.css";
import { PokemonContext } from "../context/PokemonContext.jsx";
import SearchIcon from "@mui/icons-material/Search";

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
  const [query, setQuery] = useState("");

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

    // IIFE to get details of each pokemon
    (async () => {
      try {
        const results = await Promise.all(
          // for each grass list item, use its provided detail URL to get details with abort signal
          grassList.map(async ({ url }) => {
            const res = await fetch(url, { signal: ctrl.signal });
            if (!res.ok) throw new Error(`Failed: ${res.status}`);
            const data = await res.json();

            // extract data
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

            // return extracted datas
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return details;
    return details.filter((p) => p.name.toLowerCase().includes(q));
  }, [details, query]);

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
    <>
      <div></div>
      <div className="grass__wrapper">
        <div className="grass__input-control">
          <label className="grass__input-label">
            <SearchIcon
              className="grass__search-icon"
              sx={{ color: "#2b8a3e" }}
            />
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a Grass Pokemon"
            className="grass__input"
          />
        </div>
        <main className="grass__main">
          {filtered.map((p) => (
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

      <footer className="grass__footer">
        <p className="grass__footer-text">
          Created by{" "}
          <a
            className="grass__footer-link"
            rel="noopener noreferrer"
            href="https://github.com/bhoamikhona"
          >
            <strong>Bhoami K Khona</strong>
          </a>
        </p>
      </footer>
    </>
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
