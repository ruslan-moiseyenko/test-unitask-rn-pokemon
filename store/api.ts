import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PokemonApiResponse,
  PokemonDetail,
  TransformedPokemonResponse
} from "../types/pokemon";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemons: builder.query<
      TransformedPokemonResponse,
      {
        offset: number;
        limit: number;
        search?: string;
      }
    >({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
      transformResponse: (response: PokemonApiResponse, meta, arg) => {
        const results = response.results.map((pokemon, index) => ({
          ...pokemon,
          id: arg.offset + index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            arg.offset + index + 1
          }.png`
        }));

        const filteredResults = arg.search
          ? results.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(arg.search!.toLowerCase())
            )
          : results;

        return {
          results: filteredResults,
          count: response.count,
          nextOffset:
            filteredResults.length === arg.limit ? arg.offset + arg.limit : null
        };
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return `${queryArgs.offset}-${queryArgs.limit}${
          queryArgs.search ? `-${queryArgs.search}` : ""
        }`;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
      keepUnusedDataFor: 300
    }),
    getPokemonByName: builder.query<PokemonDetail, string>({
      query: (name) => `pokemon/${name}`
    })
  })
});

export const { useGetPokemonsQuery, useGetPokemonByNameQuery } = pokemonApi;
