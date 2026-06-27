/**
 * Premium Animation Presets
 * Easing: cubic-bezier(0.22, 1, 0.36, 1) — Awwwards-grade smooth
 * No springs, no bounce — deliberate & cinematic
 */

/* ── Premium easing (export for inline use) ────────────────── */
export const PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const PREMIUM_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ── Duration constants ────────────────────────────────────── */
export const DUR = {
  fast: 0.6,
  base: 0.9,
  slow: 1.2,
  xslow: 1.6,
} as const;

/* ── Stagger delay between sibling elements ─────────────────── */
export const STAG = 0.1;

/* ── Hero opening sequence phases (ms) ───────────────────── */
export const HERO_PHASE = {
  VIDEO: 200,
  TAG: 700,
  TITLE: 1000,
  SUBTITLE: 1400,
  ACTIONS: 1700,
  CARDS: 2000,
} as const;

/* ── Variants: section header clip-path reveal ───────────────
 *  Heading is wrapped in overflow:hidden; child slides up.
 *  English label uses clip-path: inset(0 100% 0 0) → reveal.
 */
export const headerReveal = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { delay, duration: DUR.fast, ease: PREMIUM },
  }),
};

/* ── Variants: text lines slide-up reveal ────────────────────
 *  Wrap each line in a <div className="overflow-hidden">
 *  and use `lineReveal` on the inner <motion.div>.
 */
export const lineReveal = {
  hidden: { y: '105%' },
  visible: (delay: number = 0) => ({
    y: '0%',
    transition: {
      delay,
      duration: DUR.slow,
      ease: PREMIUM,
    },
  }),
};

/* ── Variants: clip-path horizontal reveal (for EN labels) ─── */
export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: (delay: number = 0) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      delay,
      duration: DUR.slow,
      ease: PREMIUM,
    },
  }),
};

/* ── Variants: card dramatic entrance ────────────────────────
 *  Card starts scaled down + shifted + masked, then settles.
 *  Used with whileInView so it replays on scroll.
 */
export const cardEntrance = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.96,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: DUR.base,
      ease: PREMIUM,
    },
  }),
};

/* ── Variants: image parallax / reveal ─────────────────────── */
export const imageReveal = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 1.04,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: DUR.slow,
      ease: PREMIUM,
    },
  }),
};

/* ── Variants: fade-up (replaces old bounce) ──────────────── */
export const fadeUpPremium = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: DUR.base,
      ease: PREMIUM,
    },
  }),
};

/* ── Viewport config — once:true, margin:-80px ───────────── */
export const VIEWPORT = { once: true, margin: '-80px' } as const;
