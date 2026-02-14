/**
 * Get the Pokemon API URL from environment variables.
 * @returns The Pokemon API URL.
 */
const getPokemonApiUrl = (): string => {
  const endpoint = process.env.NEXT_PUBLIC_POKEMON_API_URL;
  if (!endpoint) {
    throw new Error('NEXT_PUBLIC_POKEMON_API_URL is not defined in the environment variables');
  } else {
    return endpoint;
  }
};

export const config = {
  pokemonApiUrl : getPokemonApiUrl()
};