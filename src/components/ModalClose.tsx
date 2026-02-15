'use client';

import { useRouter } from 'next/navigation';
import styles from './ModalClose.module.css';

export default function ModalClose({ query }: { query?: string }) {
  const { replace } = useRouter();

  const handleClose = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    replace(`/?${params.toString()}`);
  };

  return (
    <>
      <div 
        className={styles.modalOverlay} 
        onClick={handleClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Escape') handleClose();
        }}
        aria-label="Close modal overlay"
      />
      <button 
        className={styles.modalClose}
        onClick={handleClose}
        aria-label="Close modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </>
  );
}
