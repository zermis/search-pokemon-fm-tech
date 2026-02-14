export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export interface PokemonAttack {
  fast: Attack[];
  special: Attack[];
}

export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface PokemonEvolutionRequirement {
  amount: number;
  name: string;
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  attacks: PokemonAttack;
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  evolutions: Pokemon[] | null;
  evolutionRequirements: PokemonEvolutionRequirement | null;
  maxHP: number;
  image: string;
}

export interface PokemonsResponse {
  pokemons: Pokemon[];
}

export interface PokemonResponse {
  pokemon: Pokemon;
}