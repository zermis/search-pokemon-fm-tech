import { Suspense } from 'react';
import { fetchPokemons, fetchPokemon } from '@/lib/data';
import SearchBar from '@/components/SearchBar';
import PokemonGrid from '@/components/PokemonGrid';
import PokemonDetail from '@/components/PokemonDetail';
import styles from './page.module.css';

export default async function PokemonContent({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams;
  const query = q || '';  
  const pokemons = await fetchPokemons(200);
  const selectedPokemon = query ? await fetchPokemon(query) : null;
  //console.log('Selected Pokémon:', selectedPokemon);

  return (
    <main className={styles.main}>
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <div className={styles.container}>
            {/* Left side - Search and Grid */}
            <div className={styles.leftPanel}>
              <div className={styles.searchSection}>
                <h1 className={styles.title}>Pokémon Finder</h1>
                <p className={styles.subtitle}>Discover and explore your favorite Pokémon</p>
                <SearchBar />
              </div>
              <div className={styles.gridSection}>
                <h2 className={styles.gridTitle}>
                  {query ? 'Search Results' : 'Popular Pokémon'}
                </h2>
                <PokemonGrid query={query} pokemons={pokemons} />
              </div>
            </div>

            {/* Right side - Detail View */}
            <div className={styles.rightPanel}>
              {selectedPokemon ? (
                <PokemonDetail pokemon={selectedPokemon} />
              ) : (
                <div className={styles.placeholder}>
                  <div className={styles.placeholderContent}>
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      fill="none"
                      className={styles.placeholderIcon}
                    >
                      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="4" />
                      <circle cx="60" cy="60" r="30" fill="currentColor" opacity="0.1" />
                      <circle cx="60" cy="60" r="15" fill="currentColor" opacity="0.2" />
                    </svg>
                    <h2 className={styles.placeholderTitle}>Select a Pokémon</h2>
                    <p className={styles.placeholderText}>
                      Choose a Pokémon from the grid or search to view detailed information
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Suspense>
    </main>
  );
}

