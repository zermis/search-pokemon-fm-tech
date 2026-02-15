"use client";

import { Pokemon } from '@/types/pokemon';
import { useRouter } from 'next/navigation';
import styles from './PokemonGrid.module.css';
import { refreshPokemonCache } from '@/lib/action';

export default function PokemonGrid({ query, pokemons} : { query: string, pokemons: Pokemon[] }) {
  const { replace } = useRouter();
  
  // Filter pokemons based on query
  const filteredPokemons = query 
    ? pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().startsWith(query.toLowerCase())
      )
    : pokemons;

  // Handle click on Pokémon card to navigate to details
  const handlePokemonClick = (name: string) => {
    const params = new URLSearchParams();
    if (query) {
      params.set('q', query);
      refreshPokemonCache(query);
    }
    params.set('selected', name.toLowerCase());
    replace(`/?${params.toString()}`);
  };

  // Handle keyboard navigation for Pokémon cards
  const handleKeyDown = (e: React.KeyboardEvent, name: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePokemonClick(name);
    }
  };

  return (
    <div className={styles.grid}>
      {filteredPokemons.length === 0 && query ? (
        <div className={styles.noResults}>
          No Pokémon found with &quot;{query}&quot;
        </div>
      ) : (
        filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className={styles.card}
            onClick={() => handlePokemonClick(pokemon.name)}
            onKeyDown={(e) => handleKeyDown(e, pokemon.name)}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${pokemon.name}`}
          >
            <div className={styles.imageContainer}>
              <img 
                src={pokemon.image} 
                alt={pokemon.name} 
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <span className={styles.number}>#{pokemon.number}</span>
              <h3 className={styles.name}>{pokemon.name}</h3>
              <div className={styles.types}>
                {pokemon.types.map((type) => (
                  <span key={type} className={`${styles.type} ${styles[`type${type}`]}`}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
