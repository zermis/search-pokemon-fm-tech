'use client';

import { Pokemon } from '@/types/pokemon';
import { useRouter } from 'next/navigation';
import styles from './PokemonDetail.module.css';

interface PokemonDetailProps {
  pokemon: Pokemon;
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const router = useRouter();

  const handleEvolutionClick = (name: string) => {
    router.push(`/?q=${encodeURIComponent(name.toLowerCase())}`);
  };

  const hasEvolutions = pokemon.evolutions && pokemon.evolutions.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        {/* Main card */}
        <div className={styles.mainCard}>
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <div>
                <span className={styles.number}>#{pokemon.number}</span>
                <h1 className={styles.name}>{pokemon.name}</h1>
                <p className={styles.classification}>{pokemon.classification}</p>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
            </div>
          </div>

          <div className={styles.content}>
            {/* Types */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Types</h3>
              <div className={styles.types}>
                {pokemon.types.map((type) => (
                  <span key={type} className={`${styles.type} ${styles[`type${type}`]}`}>
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Stats</h3>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Max CP</span>
                  <span className={styles.statValue}>{pokemon.maxCP}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Max HP</span>
                  <span className={styles.statValue}>{pokemon.maxHP}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Weight</span>
                  <span className={styles.statValue}>{pokemon.weight.minimum} - {pokemon.weight.maximum}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Height</span>
                  <span className={styles.statValue}>{pokemon.height.minimum} - {pokemon.height.maximum}</span>
                </div>
              </div>
            </div>

            {/* Weaknesses & Resistances */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Weaknesses</h3>
              <div className={styles.badges}>
                {pokemon.weaknesses.map((weakness) => (
                  <span key={weakness} className={`${styles.badge} ${styles[`type${weakness}`]}`}>
                    {weakness}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Resistant</h3>
              <div className={styles.badges}>
                {pokemon.resistant.map((resist) => (
                  <span key={resist} className={`${styles.badge} ${styles[`type${resist}`]}`}>
                    {resist}
                  </span>
                ))}
              </div>
            </div>

            {/* Attacks */}
            {pokemon.attacks.fast.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Fast Attacks</h3>
                <div className={styles.attacks}>
                  {pokemon.attacks.fast.map((attack) => (
                    <div key={attack.name} className={styles.attack}>
                      <span className={styles.attackName}>{attack.name}</span>
                      <span className={styles.attackType}>{attack.type}</span>
                      <span className={styles.attackDamage}>{attack.damage} dmg</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pokemon.attacks.special.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Special Attacks</h3>
                <div className={styles.attacks}>
                  {pokemon.attacks.special.map((attack) => (
                    <div key={attack.name} className={styles.attack}>
                      <span className={styles.attackName}>{attack.name}</span>
                      <span className={styles.attackType}>{attack.type}</span>
                      <span className={styles.attackDamage}>{attack.damage} dmg</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evolutions - Interactive cards at bottom */}
            {hasEvolutions && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Evolutions</h3>
                <div className={styles.evolutionsGrid}>
                  {pokemon.evolutions!.map((evolution) => (
                    <div
                      key={evolution.id}
                      className={styles.evolutionCard}
                      onClick={() => handleEvolutionClick(evolution.name)}
                    >
                      <img src={evolution.image} alt={evolution.name} className={styles.evolutionImage} />
                      <div className={styles.evolutionInfo}>
                        <span className={styles.evolutionNumber}>#{evolution.number}</span>
                        <span className={styles.evolutionName}>{evolution.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {pokemon.evolutionRequirements && (
                  <p className={styles.evolutionReq}>
                    Requires {pokemon.evolutionRequirements.amount} {pokemon.evolutionRequirements.name}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}