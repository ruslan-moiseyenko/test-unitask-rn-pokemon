import { Pokemon, PokemonDetail, PokemonState } from "@/types/pokemon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PokemonState = {
  allPokemon: [],
  detailedPokemon: {},
  searchTerm: "",
  strengthFilter: {
    low: 0,
    high: 100,
    isActive: false
  },
  strengthRange: {
    min: 0,
    max: 100
  },
  isFirstLoad: true
};

const pokemonSlice = createSlice({
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
    addPokemonDetails: (state, action: PayloadAction<PokemonDetail[]>) => {
      const newDetailedPokemon = { ...state.detailedPokemon };
      const strengthValues: number[] = [];

      if (!state.strengthRange) {
        state.strengthRange = {
          min: 50,
          max: 50
        };
      }
      if (!state.strengthFilter) {
        state.strengthFilter = {
          low: 50,
          high: 50,
          isActive: false
        };
      }

      action.payload.forEach((pokemon) => {
        if (pokemon?.id) {
          newDetailedPokemon[pokemon.id] = pokemon;

          const basicPokemon = state.allPokemon.find(
            (p) => p.id === pokemon.id
          );
          if (basicPokemon) {
            const attackStat = pokemon.stats.find(
              (stat) => stat.stat.name === "attack"
            );
            basicPokemon.strength = attackStat ? attackStat.base_stat : 0;
            strengthValues.push(attackStat?.base_stat ?? 0);
          }
        }
      });

      state.detailedPokemon = newDetailedPokemon;

      //strength range correction
      if (strengthValues.length > 0) {
        const currentMin = Math.min(...strengthValues);
        const currentMax = Math.max(...strengthValues);

        if (state.isFirstLoad) {
          state.strengthRange.min = currentMin;
          state.strengthRange.max = currentMax;
          state.strengthFilter.low = currentMin;
          state.strengthFilter.high = currentMax;
          state.isFirstLoad = false;
        } else {
          state.strengthRange.min = Math.min(
            state.strengthRange.min,
            currentMin
          );

          state.strengthRange.max = Math.max(
            state.strengthRange.max,
            currentMax
          );

          state.strengthFilter.low = Math.max(
            state.strengthFilter.low,
            state.strengthRange.min
          );
          state.strengthFilter.high = Math.min(
            state.strengthFilter.high,
            state.strengthRange.max
          );
        }
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setStrengthFilter: (
      state,
      action: PayloadAction<{ low: number; high: number }>
    ) => {
      if (!state.strengthFilter) {
        state.strengthFilter = {
          low: 0,
          high: 100,
          isActive: false
        };
      }
      state.strengthFilter.low = action.payload.low;
      state.strengthFilter.high = action.payload.high;
    },
    toggleStrengthFilter: (state, action: PayloadAction<boolean>) => {
      state.strengthFilter.isActive = action.payload;
    },
    clearStrengthFilter: (state) => {
      state.strengthFilter = initialState.strengthFilter;
    },
    clearAllData: (state) => {
      state.allPokemon = [];
      state.detailedPokemon = {};
      state.searchTerm = "";
      state.strengthFilter = initialState.strengthFilter;
      state.strengthRange = initialState.strengthRange;
      state.isFirstLoad = true;
    }
  }
});

export const {
  addPokemon,
  addPokemonDetails,
  setSearchTerm,
  setStrengthFilter,
  toggleStrengthFilter,
  clearStrengthFilter,
  clearAllData
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
