'use client';

import { useState } from 'react';
import Form from 'next/form'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  //const router = useRouter();
  //const [query, setQuery] = useState(searchParams.get('q') || '');

  function handleSearch(query: string) {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Form className={styles.searchForm} action="/">
      <div className={styles.searchContainer}>
        <input 
          name="q" 
          placeholder='Search Pokémon...'
          className={styles.searchInput}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('q')?.toString()}
        />
        <button type="submit" className={styles.searchButton}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </Form>
  );

  //return (
  //  <form className={styles.searchForm} onSubmit={handleSubmit}>
  //    <div className={styles.searchContainer}>
  //      <input
  //        type="text"
  //        value={query}
  //        onChange={(e) => setQuery(e.target.value)}
  //        placeholder="Search Pokémon..."
  //        className={styles.searchInput}
  //      />
  //      <button type="submit" className={styles.searchButton}>
  //        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
  //          <path
  //            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
  //            stroke="currentColor"
  //            strokeWidth="2"
  //            strokeLinecap="round"
  //            strokeLinejoin="round"
  //          />
  //        </svg>
  //      </button>
  //    </div>
  //  </form>
  //);
}