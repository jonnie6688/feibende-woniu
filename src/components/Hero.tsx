import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, heroSlides } from '@/data/portfolio';
import ImageCarousel from './ImageCarousel';
import { PREMIUM, DUR, HERO_PHASE, STAG, VIEWPORT } from '@/styles/animations';

/* ── Premium Hero Opening Sequence ──────────────────────────
 *  Phase 0 (mount) : everything hidden
 *  Phase 1 (+200ms) : video fades in (scale 1.06→1)
 *  Phase 2 (+700ms) : tag clip-reveals
 *  Phase 3 (+1000ms): title lines slide up one by one
 *  Phase 4 (+1400ms): subtitle fades up
 *  Phase 5 (+1700ms): action buttons appear
 *  Phase 6 (+2000ms): right-side cards enter
 */

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), HERO_PHASE.VIDEO);
    const t2 = setTimeout(() => setPhase(2), HERO_PHASE.TAG);
    const t3 = setTimeout(() => setPhase(3), HERO_PHASE.TITLE);
    const t4 = setTimeout(() => setPhase(4), HERO_PHASE.SUBTITLE);
    const t5 = setTimeout(() => setPhase(5), HERO_PHASE.ACTIONS);
    const t6 = setTimeout(() => setPhase(6), HERO_PHASE.CARDS);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); };
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* helpers */
  const show = (p: number) => phase >= p;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-base"
    >
      {/* ── Opening curtain (reveals on mount) ─────────────── */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ delay: 0.1, duration: 1.2, ease: PREMIUM }}
        className="fixed inset-0 z-[100] origin-right bg-[#08090d] pointer-events-none"
      />

      {/* ── Video Background ────────────────────────────────── */}
      <motion.video
        ref={videoRef}
        src="hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={show(1) ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: DUR.xslow, ease: PREMIUM }}
        className="absolute inset-0 w-full h-full object-cover z-0"
        onLoadedData={() => {}}
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%2308090d'/%3E%3C/svg%3E"
      />

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `linear-gradient(
            120deg,
            rgba(8,9,13,0.92) 0%,
            rgba(8,9,13,0.72) 35%,
            rgba(8,9,13,0.45) 60%,
            rgba(8,9,13,0.75) 100%
          )`,
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(229,57,53,0.06) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="container-max relative z-10 w-full pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* ── Left Column ─────────────────────────────────── */}
          <div className="relative">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={show(2) ? { opacity: 1 } : {}}
              transition={{ duration: DUR.fast, ease: PREMIUM }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-6 overflow-hidden"
            >
              <span className="accent-dot" />
              {/* Tag text: clip-path reveal */}
              <div className="relative overflow-hidden">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={show(2) ? { y: '0%' } : {}}
                  transition={{ duration: DUR.slow, ease: PREMIUM, delay: 0.05 }}
                >
                  <span className="text-caption text-accent/90">AI VISUAL DESIGN STUDIO</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Main Title — line-by-line slide-up reveal */}
            <h1 className="text-display-xl text-text-primary mb-6 leading-[1.05]">
              {/* Line 1: 用 AI */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={show(3) ? { y: '0%' } : {}}
                  transition={{ duration: DUR.slow, ease: PREMIUM, delay: 0 }}
                >
                  用 AI
                </motion.div>
              </div>
              {/* Line 2: 重塑视觉表达 (gradient) */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={show(3) ? { y: '0%' } : {}}
                  transition={{ duration: DUR.slow, ease: PREMIUM, delay: 0.1 }}
                >
                  <span className="text-gradient">重塑视觉表达</span>
                </motion.div>
              </div>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={show(4) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DUR.base, ease: PREMIUM }}
              className="text-body-lg max-w-lg mb-10"
            >
              {personalInfo.title} — 专注 AI 图像生成、视频创作与 ComfyUI
              工作流搭建，将前沿 AI 能力转化为可落地的视觉解决方案。
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={show(5) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DUR.base, ease: PREMIUM }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="px-7 py-3.5 bg-accent text-base font-semibold rounded-full transition-all duration-500 hover:bg-accent-dim hover:shadow-[0_0_40px_rgba(229,57,53,0.35)]"
              >
                查看作品
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-7 py-3.5 text-text-secondary hover:text-text-primary font-medium border border-surface-border/80 rounded-full transition-all duration-500 hover:border-accent/30 backdrop-blur-sm hover:bg-surface/30"
              >
                联系我
              </button>
            </motion.div>

            {/* Floating Stats — left (delayed) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={show(5) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DUR.base, ease: PREMIUM, delay: 0.15 }}
              className="hidden xl:flex items-center gap-4 mt-16"
            >
              {personalInfo.stats.slice(0, 3).map((stat, i) => (
                <div
                  key={i}
                  className="px-5 py-4 rounded-2xl bg-base-card/80 backdrop-blur-md border border-surface-border/80 hover:border-accent/20 transition-all duration-500 group"
                >
                  <div className="text-2xl font-display font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-caption text-text-muted text-[0.65rem] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column: Image Carousel ─────────────────── */}
          <div className="relative hidden lg:flex items-center justify-center h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-accent/4 rounded-full blur-[100px]" />

            {/* Main card — dramatic scale-in entrance */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={show(6) ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: DUR.slow, ease: PREMIUM }}
              className="w-full max-w-[420px]"
            >
              <ImageCarousel slides={heroSlides} interval={5000} />
            </motion.div>

            {/* Small stat card — slides up from below */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={show(6) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DUR.slow, ease: PREMIUM, delay: 0.15 }}
              className="absolute -bottom-4 -left-8 p-5 rounded-2xl bg-base-card/90 backdrop-blur-md border border-surface-border/80 hover:border-accent/20 transition-all duration-500"
            >
              <div className="text-3xl font-display font-semibold text-accent">{personalInfo.stats[3].value}</div>
              <div className="text-caption text-text-muted text-[0.65rem] mt-1">
                {personalInfo.stats[3].label}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator — fades in last */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={show(6) ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: PREMIUM, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-caption text-text-muted text-[0.65rem] tracking-widest">
            SCROLL
          </span>
          <motion.div
            animate={{ height: [32, 48, 32] }}
            transition={{ duration: 2, repeat: Infinity, ease: PREMIUM }}
            className="w-px bg-gradient-to-b from-accent/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
