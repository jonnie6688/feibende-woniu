import { motion } from 'framer-motion';
import { personalInfo, timeline } from '@/data/portfolio';
import BorderGlow from './BorderGlow';
import SoftAurora from './SoftAurora';
import { PREMIUM, DUR, STAG, VIEWPORT, clipReveal, lineReveal, cardEntrance } from '@/styles/animations';

/* ── Stagger wrapper ───────────────────────────────────── */
function StaggerReveal({
  children,
  delay = 0,
  stagger = STAG,
}: {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay, staggerChildren: stagger, ease: PREMIUM }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-[var(--space-3xl)] overflow-hidden">
      {/* Aurora Background Layer */}
      <div className="absolute inset-0 z-0">
        <SoftAurora
          speed={0.5}
          scale={1.8}
          brightness={0.6}
          color1="#E53935"
          color2="#FF6B6B"
          noiseFrequency={2.0}
          noiseAmplitude={1.2}
          bandHeight={0.45}
          bandSpread={1.2}
          octaveDecay={0.12}
          layerOffset={0.4}
          colorSpeed={0.7}
          enableMouseInteraction={true}
          mouseInfluence={0.2}
        />
        <div className="absolute inset-0 bg-base/75" />
      </div>

      <div className="container-max relative z-10">
        {/* ── Section Header: clip-path + line reveal ─────── */}
        <div className="mb-14">
          {/* English label: horizontal clip reveal */}
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0)' }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: PREMIUM }}
            className="overflow-hidden inline-block"
          >
            <span className="text-caption text-accent/80">ABOUT</span>
          </motion.div>

          {/* Chinese heading: line slide-up reveal */}
          <div className="mt-3 overflow-hidden">
            <motion.div
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.slow, ease: PREMIUM, delay: 0.08 }}
              className="text-display-md text-text-primary"
            >
              关于我
            </motion.div>
          </div>
        </div>

        {/* Top Grid: Large Card + Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left: Large Visual Card — dramatic scale-in */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: PREMIUM }}
            className="h-full"
          >
            <BorderGlow
              borderRadius={32}
              backgroundColor="#11141b"
              glowColor="3 90 58"
              colors={['#E53935', '#FF6B6B', '#FF8A80']}
              glowIntensity={1.2}
              edgeSensitivity={25}
              glowRadius={48}
              coneSpread={20}
              className="min-h-[420px] lg:min-h-[520px]"
            >
              <div className="relative w-full h-full min-h-[420px] lg:min-h-[520px] overflow-hidden rounded-[2rem]">
                <motion.img
                  src="/avatar.jpg"
                  alt={personalInfo.name}
                  className="absolute inset-0 w-full h-full object-contain object-center"
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 2, ease: PREMIUM }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
                {/* Circle + Cross Overlay */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                  viewBox="0 0 400 500"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(229,57,53,0.15)" strokeWidth="1" />
                  <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(229,57,53,0.08)" strokeWidth="0.5" />
                  <line x1="60" y1="200" x2="340" y2="200" stroke="rgba(229,57,53,0.1)" strokeWidth="0.5" />
                  <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(229,57,53,0.1)" strokeWidth="0.5" />
                </svg>
                <div className="absolute bottom-8 left-8 z-10">
                  <div className="text-display-md text-white font-display">{personalInfo.name}</div>
                  <div className="text-caption text-accent/80 mt-1">AI DESIGNER</div>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Right: Manifesto + Stats */}
          <div className="flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.base, ease: PREMIUM, delay: 0.15 }}
            >
              <p className="text-display-md text-text-primary leading-tight">
                我们<span className="text-accent">设计</span>并落地
                <span className="text-accent"> AI 视觉方案</span>，
                <br />
                让每一套
                <span className="text-accent">系统</span>都真正服务于
                <br />
                真实创作需求。
              </p>
            </motion.div>

            {/* Stats grid — staggered cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="grid grid-cols-2 gap-4 mt-10"
            >
              {personalInfo.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.97 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: DUR.base, ease: PREMIUM },
                    },
                  }}
                  className="p-5 rounded-2xl border border-surface-border/80 bg-base-card/50 hover:border-accent/20 transition-all duration-500 group"
                >
                  <div className="text-3xl font-display font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-caption text-text-muted mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Grid: Timeline + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Timeline — each item reveals with left slide */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="accent-dot" />
              <span className="text-caption text-accent/80">成长路径</span>
            </div>
            <div className="relative pl-8 border-l border-surface-border/60 space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: DUR.base, ease: PREMIUM },
                    },
                  }}
                  className="relative"
                >
                  <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-accent bg-base" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-accent font-mono text-sm font-medium">{item.year}</span>
                      <span className="text-text-primary font-medium text-sm">{item.stage}</span>
                    </div>
                    <p className="text-body text-sm">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="accent-dot" />
              <span className="text-caption text-accent/80">联系方式</span>
            </div>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: PREMIUM } },
              }}
              className="text-body-lg mb-8"
            >
              {personalInfo.intro}
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href={`mailto:${personalInfo.email}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: PREMIUM } },
                }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-surface-border/80 bg-base-card/50 hover:border-accent/20 transition-all duration-500 group"
              >
                <span className="text-sm">📧</span>
                <span className="text-text-secondary text-sm font-mono group-hover:text-text-primary transition-colors">
                  {personalInfo.email}
                </span>
              </motion.a>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: PREMIUM } },
                }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-surface-border/80 bg-base-card/50"
              >
                <svg className="w-4 h-4 text-[#07C160] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.32.32 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.434-.982.969-.982zm5.34 3.97c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.139.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.49.49 0 01.176-.553C23.389 19.35 24 17.674 24 15.84c0-3.332-3.148-6.06-7.062-6.179zm-2.847 2.675c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" />
                </svg>
                <span className="text-text-secondary text-sm font-mono select-text cursor-text">{personalInfo.wechat}</span>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: PREMIUM } },
                }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-surface-border/80 bg-base-card/50"
              >
                <span className="text-sm">📍</span>
                <span className="text-text-secondary text-sm">{personalInfo.location}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
