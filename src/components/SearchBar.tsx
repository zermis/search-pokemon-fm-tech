'use client';

import Form from 'next/form'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounced search handler to update URL query parameters
  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

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
        <button type="submit" className={styles.searchButton} aria-label="Search Pokémon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
}