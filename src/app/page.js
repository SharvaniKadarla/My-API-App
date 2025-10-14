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

  /*STARS*/
  useEffect(() => {
  const body = document.body;
  const numStars = 50;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";

    
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

   
    const size = 2 + Math.random() * 3; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.opacity = 0.3 + Math.random() * 0.7;

    body.appendChild(star);
  }
}, []);


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
    

    <div className="homepage__main-wrapper">
      <main className="homepage__main">
        {["electric", "fire", "grass", "water"].map((c) => (
          <Card key={c} name={c} />
        ))}
      </main>
    </div>
  );
}

function Card({ name }) {
  return (
    <article className="homepage__card">
      <div className="homepage__card--left">
        <div className="homepage__card__img-container">
          <img
            src={`${name}.png`}
            alt={`${name} icon`}
            className="homepage__card__img"
          />
        </div>
      </div>
      <div className="homepage__card--right">
        <h2 className="homepage__card__title">{name}</h2>
        <p className="homepage__card__description">
          Explore all the {name} types.
        </p>
        <Link className="homepage__card__link" href={`/${name}`}>
          {"Let's Go!"}
        </Link>
      </div>
    </article>
  );
}
