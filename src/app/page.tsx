import { Suspense } from 'react';
import { fetchPokemons, fetchPokemon } from '@/lib/data';
import SearchBar from '@/components/SearchBar';
import PokemonGrid from '@/components/PokemonGrid';
import PokemonDetail from '@/components/PokemonDetail';
import ModalClose from '@/components/ModalClose';
import styles from './page.module.css';
import modalStyles from '@/components/ModalClose.module.css';

async function PokemonContent({
  searchParams
}: {
  searchParams: Promise<{ q?: string; selected?: string }>
}) {
  const { q, selected } = await searchParams;
  const query = q || '';
  const pokemons = await fetchPokemons(200);
  const selectedPokemon = selected ? await fetchPokemon(selected) : null;

  return (
    <div className={styles.container}>
      {/* Left side - Search and Grid */}
      <div className={styles.leftPanel}>
        <div className={styles.searchSection}>
          <h1 className={styles.title}>Pokémon Finder</h1>
          <p className={styles.subtitle}>Discover and explore your favorite Pokémon from Pokémon API</p>
          <SearchBar />
        </div>
        <div className={styles.gridSection}>
          <h2 className={styles.gridTitle}>
            {query ? 'Search Results' : 'Popular Pokémon'}
          </h2>
          <PokemonGrid 
            query={query} 
            pokemons={pokemons} 
          />
        </div>
      </div>

      {/* Right side - Detail View */}
      <div className={styles.rightPanel}>
        {selectedPokemon ? (
          <PokemonDetail
            query={query} 
            pokemon={selectedPokemon} 
          />
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderContent}>
              <h2 className={styles.placeholderTitle}>Select a Pokémon</h2>
              <p className={styles.placeholderText}>
                Choose a Pokémon from the grid or search to view detailed information
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Modal Overlay */}
      {selectedPokemon && (
        <>
          <ModalClose query={query} />
          <div className={modalStyles.modalContent}>
            <PokemonDetail
              query={query} 
              pokemon={selectedPokemon} 
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function Page({
  searchParams
}: {
  searchParams: Promise<{ q?: string; selected?: string }>
}) {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <PokemonContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}