"use client";
import React, { useContext, useEffect } from "react";
import { PokemonContext } from "./context/PokemonContext.jsx";
import Link from "next/link.js";

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
    // <main>
    //   <section>
    //     <h2>⚡ Electric ({pokemonsByType.electric.length})</h2>
    //     <ul>
    //       {pokemonsByType.electric.slice(0, 12).map((p) => (
    //         <li key={p.name}>{p.name}</li>
    //       ))}
    //     </ul>
    //   </section>

    //   <section>
    //     <h2>🔥 Fire ({pokemonsByType.fire.length})</h2>
    //     <ul>
    //       {pokemonsByType.fire.slice(0, 12).map((p) => (
    //         <li key={p.name}>{p.name}</li>
    //       ))}
    //     </ul>
    //   </section>

    //   <section>
    //     <h2>🌿 Grass ({pokemonsByType.grass.length})</h2>
    //     <ul>
    //       {pokemonsByType.grass.slice(0, 12).map((p) => (
    //         <li key={p.name}>{p.name}</li>
    //       ))}
    //     </ul>
    //   </section>

    //   <section>
    //     <h2>💧 Water ({pokemonsByType.water.length})</h2>
    //     <ul>
    //       {pokemonsByType.water.slice(0, 12).map((p) => (
    //         <li key={p.name}>{p.name}</li>
    //       ))}
    //     </ul>
    //   </section>
    // </main>

    <main className="homepage__main">
      {["electric", "fire", "grass", "water"].map((c) => (
        <Card key={c} name={c} />
      ))}
    </main>
  );
}

function Card({ name }) {
  return (
    <article className="homepage__card">
      <div className="homepage__card__img-container">
        <img
          src={`${name}.png`}
          alt={`${name} icon`}
          className="homepage__card__img"
        />
      </div>
      <h2 className="homepage__card__title">{name}</h2>
      <p className="homepage__card__description">
        Explore all the {name} types.
      </p>
      <Link className="homepage__card__link" href={`/${name}`}>
        {"Let's Go!"}
      </Link>
    </article>
  );
}
