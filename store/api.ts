import {
  TransformedPokemonResponse,
  PokemonApiResponse,
  PokemonDetail
} from "@/types/pokemon";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      }
    }),

    getPokemonByName: builder.query<PokemonDetail, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: (response: any): PokemonDetail => {
        return {
          id: response.id,
          name: response.name,
          height: response.height,
          weight: response.weight,
          types: response.types,
          sprites: response.sprites,
          stats: response.stats
        };
      }
    }),

    getPokemonBatch: builder.query<PokemonDetail[], string[]>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const names = _arg;
        try {
          const results = await Promise.all(
            names.map(async (name) =>
              Promise.resolve(fetchWithBQ(`pokemon/${name}`)).then(
                (response) => {
                  if (response.error) throw response.error;
                  return response.data;
                }
              )
            )
          );
          return { data: results as PokemonDetail[] };
        } catch (error) {
          return { error: { status: 500, data: error } };
        }
      }
    })
  })
});

export const {
  useGetPokemonsQuery,
  useGetPokemonByNameQuery,
  useGetPokemonBatchQuery
} = pokemonApi;
