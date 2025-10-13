"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";

export default function SpotifyLogo() {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    fetch("https://logotypes.dev/spotify")   // returns SVG
      .then((res) => res.text())
      .then((svgText) => setLogo(svgText));
  }, []);

  return (
    <Card style={{ maxWidth: 300, margin: "1rem auto", textAlign: "center" }}>
      <CardContent>
        <h2>Spotify Logo</h2>
        {logo ? (
          <div dangerouslySetInnerHTML={{ __html: logo }} />
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  );
}
