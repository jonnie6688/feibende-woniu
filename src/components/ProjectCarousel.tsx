import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MediaSlide } from '@/data/portfolio';
import { PREMIUM } from '@/styles/animations';

interface ProjectCarouselProps {
  slides: MediaSlide[];
  label?: string;
}

/* ── Lightbox overlay (click to zoom) ─────────────────────────── */
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 group"
        aria-label="关闭"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Image */}
      <motion.img
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: PREMIUM }}
        src={src}
        alt={alt}
        className="relative z-10 max-w-[90vw] max-h-[88vh] object-contain rounded-lg shadow-2xl cursor-zoom-out select-none"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

/* ── Play Button Overlay for Video Slides ─────────────────────── */
function PlayButtonOverlay({ onPlay, playing }: { onPlay: () => void; playing: boolean }) {
  if (playing) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Play button circle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
        className="relative group/play w-[68px] h-[68px] rounded-full bg-accent/90 border border-accent-glow/40 backdrop-blur-sm flex items-center justify-center text-white shadow-[0_0_32px_rgba(229,57,53,0.35)] hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="播放视频"
      >
        {/* Outer glow ring */}
        <span className="absolute -inset-1.5 rounded-full border border-accent/30 opacity-60 group-hover/play:border-accent/50 transition-colors duration-300" />

        {/* Play icon */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" className="ml-0.5 drop-shadow-md">
          <polygon points="6,4 20,12 6,20" />
        </svg>
      </button>

      {/* "点击播放" hint */}
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] text-white/70 font-medium tracking-wide bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
        点击播放视频
      </span>
    </div>
  );
}

/* ── Video Element with Controls ─────────────────────────────── */
function VideoPlayer({
  src,
  poster,
  onPauseRequest,
}: {
  src: string;
  poster?: string;
  onPauseRequest: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    /* 先静音自动播放（浏览器允许），播放成功后再取消静音 */
    v.muted = true;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          v.muted = false;
        })
        .catch(() => {
          /* 自动播放失败（极少见）：取消静音让用户可以手动点击播放 */
          v.muted = false;
        });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      preload="metadata"
      playsInline
      loop
      controls
      controlsList="nodownload noremoteplayback"
      className="w-full h-full object-cover"
      onPause={onPauseRequest}
    />
  );
}

/* ── Project Carousel ───────────────────────────────────────────── */
export default function ProjectCarousel({ slides, label }: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const total = slides.length;
  const hasMultiple = total > 1;

  /* Auto-play — pause when user interacts or video is playing */
  const [paused, setPaused] = useState(false);

  /* Per-video playback state */
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);

  /* Auto-pause carousel when any video is playing */
  useEffect(() => {
    if (playingVideoIndex !== null) setPaused(true);
  }, [playingVideoIndex]);

  useEffect(() => {
    if (!hasMultiple || paused || playingVideoIndex !== null) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(id);
  }, [hasMultiple, paused, total, playingVideoIndex]);

  /* Stop video when switching away from it */
  useEffect(() => {
    if (playingVideoIndex !== null && playingVideoIndex !== current) {
      setPlayingVideoIndex(null);
    }
  }, [current, playingVideoIndex]);

  const goTo = useCallback(
    (index: number) => {
      setPaused(true);
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const directionRef = useRef<'left' | 'right'>('right');

  const slideVariants = {
    enter: (d: 'left' | 'right') => ({
      x: d === 'right' ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: 'left' | 'right') => ({
      x: d === 'right' ? -60 : 60,
      opacity: 0,
    }),
  };

  const activeSlide = slides[current];
  const isVideo = activeSlide?.type === 'video';
  const isPlayingThisVideo = isVideo && playingVideoIndex === current;

  const handlePlayVideo = useCallback(() => {
    setPlayingVideoIndex(current);
  }, [current]);

  const handleVideoPause = useCallback(() => {
    setPlayingVideoIndex(null);
    // Resume auto-play after a delay so user can interact
    setTimeout(() => setPaused(false), 500);
  }, []);

  return (
    <>
      {/* Carousel container */}
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-surface/50 group/carousel ${
          isPlayingThisVideo ? 'cursor-default' : ''
        }`}
        onMouseEnter={() => !isPlayingThisVideo && setPaused(true)}
        onMouseLeave={() => !isPlayingThisVideo && setPaused(false)}
      >
        {/* Slides */}
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={current}
            custom={directionRef.current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            {isVideo ? (
              isPlayingThisVideo ? (
                /* Playing state: full video element with native controls */
                <VideoPlayer
                  src={activeSlide!.src!}
                  poster={activeSlide.poster}
                  onPauseRequest={handleVideoPause}
                />
              ) : (
                /* Poster / thumbnail state with play button */
                <>
                  <img
                    src={
                      activeSlide.poster ||
                      `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000'>
                        <rect fill='%231a1d29' width='1600' height='1000'/>
                        <circle cx='800' cy='500' r='120' fill='none' stroke='%23E53935' stroke-width='2' opacity='.3'/>
                        <circle cx='800' cy='500' r='180' fill='none' stroke='%23E53935' stroke-width='1' opacity='.15'/>
                        <line x1='600' y1='500' x2='1000' y2='500' stroke='%23E53935' stroke-opacity='.12' stroke-width='1'/>
                        <line x1='800' y1='300' x2='800' y2='700' stroke='%23E53935' stroke-opacity='.12' stroke-width='1'/>
                      </svg>`
                    }
                    alt={activeSlide.alt}
                    className="w-full h-full object-cover carousel-ken-burns cursor-pointer"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  <PlayButtonOverlay onPlay={handlePlayVideo} playing={false} />
                </>
              )
            ) : (
              /* Image slide */
              <img
                src={activeSlide?.src}
                alt={activeSlide?.alt}
                className="w-full h-full object-cover cursor-pointer carousel-ken-burns"
                onClick={() =>
                  activeSlide && setLightboxSrc(activeSlide.src)
                }
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay at bottom (only show when not playing video) */}
        {!isPlayingThisVideo && (
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-base-card/70 to-transparent pointer-events-none" />
        )}

        {/* Label badge */}
        {!isPlayingThisVideo && label && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase text-accent/90 bg-base/70 backdrop-blur-sm rounded-md border border-surface-border/50">
            {label} · {current + 1}/{total}
          </span>
        )}

        {/* Zoom icon on hover (images only) */}
        {!isVideo && (
          <button
            onClick={() => activeSlide && setLightboxSrc(activeSlide.src)}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-base/60 backdrop-blur-sm border border-surface-border/50 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300"
            aria-label="查看大图"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
              <line x1="11" y1="8" x2="11" y2="14" />
            </svg>
          </button>
        )}

        {/* Arrows */}
        {!isPlayingThisVideo && hasMultiple && (
          <>
            <button
              onClick={() => {
                directionRef.current = 'left';
                goTo(current - 1);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-base/60 backdrop-blur-md border border-surface-border/60 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-base/80 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300"
              aria-label="上一张"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={() => {
                directionRef.current = 'right';
                goTo(current + 1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-base/60 backdrop-blur-md border border-surface-border/60 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-base/80 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300"
              aria-label="下一张"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {!isPlayingThisVideo && hasMultiple && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  directionRef.current = idx > current ? 'right' : 'left';
                  goTo(idx);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === current
                    ? 'w-6 bg-accent'
                    : 'w-1.5 bg-white/35 hover:bg-white/55'
                }`}
                aria-label={`第${idx + 1}张`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox
            src={lightboxSrc}
            alt=""
            onClose={() => setLightboxSrc(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
