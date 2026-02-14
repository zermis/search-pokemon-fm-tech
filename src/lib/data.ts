import { GraphQLClient, gql } from 'graphql-request';
import { Pokemon, PokemonsResponse, PokemonResponse } from '@/types/pokemon';
import { config } from './config';

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

export async function fetchPokemons(first: number = 200): Promise<Pokemon[]> {
  try {
    const data = await client.request<PokemonsResponse>(GET_POKEMONS, { first });
    return data.pokemons;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    return [];
  }
}

export async function fetchPokemon(name: string): Promise<Pokemon | null> {
  try {
    const data = await client.request<PokemonResponse>(GET_POKEMON, { name });
    return data.pokemon;
  } catch (error) {
    console.error('Error fetching pokemon:', error);
    return null;
  }
}

export async function fetchFilteredPokemons(query: string, pokemons: Pokemon[]): Promise<Pokemon[]> {
  const filtered = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(query.toLowerCase())
  );
  return filtered;
}
