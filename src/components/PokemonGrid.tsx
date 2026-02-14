import { Pokemon } from '@/types/pokemon';
import styles from './PokemonGrid.module.css';
import { fetchFilteredPokemons } from '@/lib/data';

interface PokemonGridProps {
  pokemons: Pokemon[];
}

export default async function PokemonGrid({ query, pokemons} : { query: string, pokemons: Pokemon[] }) {
  const filtedPokemons = await fetchFilteredPokemons(query, pokemons);
  //const { replace } = useRouter();

  //const handlePokemonClick = (name: string) => {
  //  router.push(`/?q=${encodeURIComponent(name.toLowerCase())}`);
  //};

  return (
    <div className={styles.grid}>
      {filtedPokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className={styles.card}
          //onClick={() => handlePokemonClick(pokemon.name)}
        >
          <div className={styles.imageContainer}>
            <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
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
      ))}
    </div>
  );
}
