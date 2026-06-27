import { useState, useEffect } from 'react';

/**
 * Tracks visitor count across sessions using sessionStorage.
 * Initial value: 1280 (set in sessionStorage on first visit).
 * Each unique session increments by 1.
 */
export function useVisitorCount(initial = 1280): number {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    const KEY = 'snail-visits';
    const stored = sessionStorage.getItem(KEY);

    if (stored === null) {
      // First visit in this session — increment global count
      const current = parseInt(localStorage.getItem(KEY) || String(initial), 10);
      const updated = current + 1;
      localStorage.setItem(KEY, String(updated));
      sessionStorage.setItem(KEY, 'done'); // mark session as counted
      setCount(updated);
    } else {
      // Returning in same session — just read current count
      const current = parseInt(localStorage.getItem(KEY) || String(initial), 10);
      setCount(current);
    }
  }, [initial]);

  return count;
}
