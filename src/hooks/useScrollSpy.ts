import { useState, useEffect, useRef, useMemo } from 'react';

/* ── rAF-throttled scroll spy with element cache ────────────
 *  • Requests elements once, avoids repeated getElementById
 *  • rAF throttle — fires no more than once per frame
 *  • offsetTop read within rAF — but still 1 forced reflow/frame max
 */

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  /* ── Stable reference to avoid useEffect re-subscribe ──── */
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;
  const offsetRef = useRef(offset);
  offsetRef.current = offset;

  /* ── Element cache — populated once each scroll frame ──── */
  const elsRef = useRef<HTMLElement[]>([]);

  /* ── rAF-based throttle ────────────────────────────────── */
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const ids = idsRef.current;

    function onScroll() {
      if (rafRef.current) return; // already queued
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;

        const off = offsetRef.current;
        const scrollY = window.scrollY;

        /* scrolled state */
        setScrolled(scrollY > 60);

        /* Populate element cache lazily on first access */
        if (elsRef.current.length !== ids.length) {
          elsRef.current = ids.map((id) => document.getElementById(id) ?? ({} as HTMLElement));
        }

        /* Walk backwards to find the topmost visible section */
        for (let i = ids.length - 1; i >= 0; i--) {
          const el = elsRef.current[i];
          if (el && el.offsetTop !== undefined && scrollY >= el.offsetTop - off) {
            setActive(ids[i]);
            return;
          }
        }
        setActive('');
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial run
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // empty deps: stable forever, use refs for mutable data

  return { active, scrolled };
}
