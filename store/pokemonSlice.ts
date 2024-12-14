import { Pokemon } from "@/types/pokemon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  allPokemon: Pokemon[];
  searchTerm: string;
}

const initialState: PokemonState = {
  allPokemon: [],
  searchTerm: ""
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Pokemon[]>) => {
      const newPokemon = [...state.allPokemon];
      action.payload.forEach((pokemon) => {
        if (!newPokemon.some((p) => p.id === pokemon.id)) {
          newPokemon.push(pokemon);
        }
      });
      state.allPokemon = newPokemon.sort((a, b) => a.id - b.id);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearPokemon: (state) => {
      state.allPokemon = [];
    }
  }
});

export const { addPokemon, setSearchTerm, clearPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
