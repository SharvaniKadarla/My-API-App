"use client";
import React, { useState, useContext, useEffect } from "react";
import { PokemonContext } from "../context/PokemonContext.jsx";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Grid,
  LinearProgress,
  Chip,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Electric() {
  const { pokemonsByType, loadPokemons, loading } = useContext(PokemonContext);
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [tab, setTab] = useState(0);
  const [showShiny, setShowShiny] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  // ✅ Load pokemons on mount only once
  useEffect(() => {
    loadPokemons();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPokemonDetails = async (url) => {
    const detailsRes = await fetch(url);
    const details = await detailsRes.json();

    const speciesRes = await fetch(details.species.url);
    const species = await speciesRes.json();

    const evoRes = await fetch(species.evolution_chain.url);
    const evoData = await evoRes.json();

    const evoChain = [];
    let evo = evoData.chain;
    do {
      evoChain.push({ name: evo.species.name });
      evo = evo.evolves_to[0];
    } while (evo && evo.evolves_to);

    setEvolution(evoChain);

    setPokemon({
      id: details.id,
      name: details.name,
      sprite: details.sprites.front_default,
      shiny: details.sprites.front_shiny,
      types: details.types.map((t) => t.type.name),
      height: details.height,
      weight: details.weight,
      stats: details.stats.map((s) => ({ name: s.stat.name, base: s.base_stat })),
      abilities: details.abilities.map((a) => ({ name: a.ability.name, hidden: a.is_hidden })),
      moves: details.moves.map((m) => m.move.name),
      description: species.flavor_text_entries.find((f) => f.language.name === "en")?.flavor_text || "",
    });
  };

  const fetchRandomElectricPokemon = async () => {
    const electricList = pokemonsByType.electric;
    if (!electricList || electricList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * electricList.length);
    const selected = electricList[randomIndex];
    setSelectedName(selected.name);
    fetchPokemonDetails(selected.url);
  };

  const handleDropdownChange = (e) => {
    const selected = pokemonsByType.electric.find((p) => p.name === e.target.value);
    setSelectedName(e.target.value);
    fetchPokemonDetails(selected.url);
  };

  const typeEffectiveness = {
    strongAgainst: ["Water", "Flying"],
    weakAgainst: ["Ground"],
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #fff8e1, #ffeb3b)",
        py: 5,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* Header */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: "#fbc02d",
          textShadow: "2px 2px 6px #ff6f00",
          textAlign: "center",
        }}
      >
        ⚡ Electric Pokémon Explorer
      </Typography>

      {/* Dropdown + Button Row */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Select a Pokémon</InputLabel>
          <Select
            value={selectedName}
            label="Select a Pokémon"
            onChange={handleDropdownChange}
            sx={{
              background: "#fffde7",
              borderRadius: "8px",
              "& .MuiSelect-select": { fontWeight: "bold" },
            }}
          >
            {pokemonsByType.electric?.map((poke) => (
              <MenuItem key={poke.name} value={poke.name} sx={{ textTransform: "capitalize" }}>
                {poke.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="warning"
          onClick={fetchRandomElectricPokemon}
          sx={{
            fontSize: "1.1rem",
            px: 4,
            py: 1.5,
            borderRadius: 5,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "🎯 Catch a Random One!"}
        </Button>
      </Stack>

      {pokemon && (
        <>
          {/* Pokémon Card */}
          <Paper
            elevation={10}
            sx={{
              width: "95%",
              maxWidth: 1000,
              borderRadius: 4,
              p: 3,
              background: "linear-gradient(145deg, #fffde7, #fff9c4)",
              boxShadow: "10px 10px 30px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {/* Image */}
              <Grid item xs={12} md={4} textAlign="center">
                <CardMedia
                  component="img"
                  image={showShiny ? pokemon.shiny : pokemon.sprite}
                  alt={pokemon.name}
                  sx={{
                    width: "180px",
                    mx: "auto",
                    transition: "transform 0.3s ease, opacity 0.3s ease",
                    transform: showShiny ? "scale(1.1)" : "scale(1)",
                    opacity: showShiny ? 0.9 : 1,
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowShiny(!showShiny)}
                  sx={{ mt: 1 }}
                >
                  {showShiny ? "Show Normal" : "Show Shiny"}
                </Button>
              </Grid>

              {/* Info */}
              <Grid item xs={12} md={8}>
                <Typography variant="h4" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                  {pokemon.name} (#{pokemon.id})
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
                  {pokemon.description}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Height: {pokemon.height} | Weight: {pokemon.weight}
                </Typography>

                <Stack direction="row" spacing={1}>
                  {pokemon.types.map((t) => (
                    <Chip
                      key={t}
                      label={t.toUpperCase()}
                      sx={{
                        background: "linear-gradient(135deg, #ffeb3b, #fdd835)",
                        fontWeight: "bold",
                        color: "#000",
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                      }}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Tabs */}
          <Box sx={{ width: "95%", maxWidth: 1000, mt: 4 }}>
            <Tabs
              value={tab}
              onChange={(e, val) => setTab(val)}
              variant="scrollable"
              scrollButtons="auto"
              textColor="warning"
              indicatorColor="warning"
              TabIndicatorProps={{ style: { backgroundColor: "#fbc02d", height: "4px" } }}
              sx={{
                mb: 2,
                "& .MuiTab-root": { textTransform: "none", fontWeight: "bold" },
                "& .Mui-selected": {
                  color: "#fbc02d !important",
                  backgroundColor: "#fff9c4",
                  borderRadius: "10px",
                },
              }}
            >
              <Tab label="Stats" />
              <Tab label="Abilities" />
              <Tab label="Moves" />
              <Tab label="Evolution" />
              <Tab label="Type Effectiveness" />
            </Tabs>

            {/* Stats */}
            {tab === 0 && (
              <Stack spacing={2}>
                {pokemon.stats.map((s) => (
                  <Box key={s.name}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {s.name.toUpperCase()} — {s.base}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={s.base}
                      sx={{
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#fff9c4",
                        "& .MuiLinearProgress-bar": { backgroundColor: "#fbc02d" },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            )}

            {/* Abilities */}
            {tab === 1 && (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {pokemon.abilities.map((a) => (
                  <Chip
                    key={a.name}
                    label={`${a.name}${a.hidden ? " (Hidden)" : ""}`}
                    color={a.hidden ? "default" : "warning"}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            )}

            {/* Moves */}
            {tab === 2 && (
              <Box
                sx={{
                  maxHeight: 250,
                  overflowY: "auto",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: 1,
                }}
              >
                {pokemon.moves.map((m) => (
                  <Chip key={m} label={m} variant="outlined" color="warning" />
                ))}
              </Box>
            )}

            {/* Evolution */}
            {tab === 3 && (
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Evolution Chain</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {evolution.map((e) => e.name).join(" → ")}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Type Effectiveness */}
            {tab === 4 && (
              <Paper sx={{ p: 2, mt: 2, background: "#fffde7", borderRadius: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  ⚡ Strong Against: {typeEffectiveness.strongAgainst.join(", ")}
                </Typography>
                <Typography variant="body1">
                  ⚡ Weak Against: {typeEffectiveness.weakAgainst.join(", ")}
                </Typography>
              </Paper>
            )}
          </Box>
        </>
      )}
      {/* Footer / Credit */}
      <Box sx={{ mt: 6, mb: 2, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "#616161" }}>
          ⚡ Page created by Sharvani Kadarla
        </Typography>
      </Box>
    </Box>  // <-- main container closes here
  );
}
