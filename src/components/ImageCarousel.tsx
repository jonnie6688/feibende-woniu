import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeroSlide } from '@/data/portfolio';

interface Props {
  slides: HeroSlide[];
  /** 轮播切换间隔 (ms)，0 表示停用自动播放 */
  interval?: number;
  className?: string;
}

const ICON_CHEVRON_LEFT = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ICON_CHEVRON_RIGHT = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

export default function ImageCarousel({ slides, interval = 4000, className = '' }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasImages = slides.some((s) => s.src);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current],
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play
  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resumeTimer = useCallback(() => {
    pauseTimer();
    if (interval > 0 && slides.length > 1) {
      intervalRef.current = setInterval(next, interval);
    }
  }, [interval, next, pauseTimer, slides.length]);

  useEffect(() => {
    resumeTimer();
    return pauseTimer;
  }, [resumeTimer, pauseTimer]);

  const slideVariants = {
    enter: (d: 1 | -1) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: 1 | -1) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const currentSlide = slides[current];

  return (
    <div
      className={`relative w-full max-w-[420px] rounded-3xl border border-surface-border/80 bg-base-card/60 backdrop-blur-xl group/carousel ${className}`}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-3">
        <span className="text-caption text-accent/80 tracking-wider">精选作品预览</span>
        <span className="text-caption text-text-muted">{current + 1} / {slides.length}</span>
      </div>

      {/* Image Area */}
      <div className="relative aspect-[4/3] mx-6 mb-2 rounded-2xl overflow-hidden bg-surface/50">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={slides[current].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            {currentSlide.src ? (
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  className="absolute inset-0 w-full h-full object-cover carousel-ken-burns"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              /* Placeholder when no image provided */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface/50">
                <svg className="w-10 h-10 text-text-muted/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="text-caption text-text-muted/50">{currentSlide.label}</span>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent" />
            {/* Label at bottom */}
            <div className="absolute bottom-3 left-3">
              <span className="px-2.5 py-1 rounded-lg bg-base/80 backdrop-blur-sm text-caption text-text-secondary border border-surface-border/60">
                {currentSlide.label}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons — only show if has images & more than 1 slide */}
        {hasImages && slides.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-base/70 backdrop-blur-md border border-surface-border/60 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/40 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300"
              aria-label="上一个"
            >
              {ICON_CHEVRON_LEFT}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-base/70 backdrop-blur-md border border-surface-border/60 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/40 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300"
              aria-label="下一个"
            >
              {ICON_CHEVRON_RIGHT}
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 pb-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-1.5 bg-accent shadow-[0_0_8px_rgba(229,57,53,0.4)]'
                : 'w-1.5 h-1.5 bg-text-muted/30 hover:bg-text-muted/60'
            }`}
            aria-label={`跳转到第 ${i + 1} 张`}
          />
        ))}
      </div>

      {/* Bottom placeholder lines (visual only) */}
      <div className="px-6 pb-6 space-y-2">
        <div className="h-2 w-full rounded-full bg-surface/40" />
        <div className="h-2 w-3/5 rounded-full bg-surface/40" />
      </div>
    </div>
  );
}
