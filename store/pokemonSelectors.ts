import { RootState } from "@/store";
import { PokemonState } from "@/types/pokemon";
import { createSelector } from "@reduxjs/toolkit";

const selectPokemonState = (state: { pokemon: PokemonState }) => state.pokemon;
const selectAllPokemon = (state: { pokemon: PokemonState }) =>
  state.pokemon.allPokemon;
const selectSearchTerm = (state: { pokemon: PokemonState }) =>
  state.pokemon.searchTerm;
const selectStrengthFilter = (state: { pokemon: PokemonState }) =>
  state.pokemon.strengthFilter;

export const selectStrengthRange = (state: RootState) =>
  state.pokemon.strengthRange;

export const selectFilteredPokemon = createSelector(
  [selectAllPokemon, selectSearchTerm, selectStrengthFilter],
  (allPokemon, searchTerm, strengthFilter) => {
    return allPokemon.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (!strengthFilter.isActive) return matchesSearch;

      const matchesStrength =
        pokemon.strength !== undefined &&
        pokemon.strength >= strengthFilter.low &&
        pokemon.strength <= strengthFilter.high;

      return matchesSearch && matchesStrength;
    });
  }
);
