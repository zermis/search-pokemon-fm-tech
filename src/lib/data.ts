import { GraphQLClient, gql } from 'graphql-request';
import { Pokemon, PokemonsResponse, PokemonResponse } from '@/types/pokemon';
import { config } from './config';
import { cacheTag } from 'next/cache';

const client = new GraphQLClient(config.pokemonApiUrl);

export const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }
`;

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      maxCP
      maxHP
      image
      evolutions {
        id
        number
        name
        image
      }
      evolutionRequirements {
        amount
        name
      }
    }
  }
`;

/**
 * Fetch a list of Pokemons with basic information. The cache is set to "use cache" to allow for caching of the pokemon list
 * since it is static most of the time.
 * @param first - The number of Pokemons to fetch (The maximum is 151 as per the API documentation)
 * @returns A Promise that resolves to an array of Pokemon objects or an empty array if an error occurs
 */
export async function fetchPokemons(first: number = 200): Promise<Pokemon[]> {
  "use cache"
  
  try {
    const data = await client.request<PokemonsResponse>(GET_POKEMONS, { first });
    return data.pokemons;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    return [];
  }
}

/**
 * Fetch a single Pokemon by name. The cacheTag is set to `pokemon-{name}` to allow for targeted cache invalidation when the Pokemon data changes.
 * @param name - The name of the Pokemon to fetch
 * @returns A Promise that resolves to the Pokemon data or null if an error occurs
 */
export async function fetchPokemon(name: string): Promise<Pokemon | null> {
  "use cache"
  cacheTag(`pokemon-${name.toLowerCase()}`);

  try {
    const data = await client.request<PokemonResponse>(GET_POKEMON, { name });
    return data.pokemon;
  } catch (error) {
    console.error(`Error fetching pokemon "${name}":`, error);
    return null;
  }
}