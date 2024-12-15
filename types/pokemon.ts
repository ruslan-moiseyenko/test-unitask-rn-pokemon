export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
  strength?: number;
}

export interface TransformedPokemonResponse {
  results: Pokemon[];
  count: number;
  nextOffset: number | null;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export interface StrengthFilter {
  low: number;
  high: number;
  isActive: boolean;
}

export interface StrengthRange {
  min: number;
  max: number;
}

export interface PokemonState {
  allPokemon: Pokemon[];
  detailedPokemon: {
    [id: number]: PokemonDetail;
  };
  searchTerm: string;
  strengthFilter: StrengthFilter;
  strengthRange: StrengthRange;
  isFirstLoad: boolean;
}
