'use server';

import { revalidateTag } from 'next/cache';

/**
 * Refreshes the cache for a specific Pokémon query by revalidating the associated cache tag.
 * @param query - The search query (pokemon name) for which to refresh the cache.
 */
export async function refreshPokemonCache(query: string) {
  const tag = `pokemon-${query.toLowerCase()}`;
  revalidateTag(tag, 'max');
}