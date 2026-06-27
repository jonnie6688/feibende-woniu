import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';
import { PREMIUM, DUR, VIEWPORT } from '@/styles/animations';

export default function AiHomeDesign() {
  return (
    <section id="ai-home" className="relative py-[var(--space-3xl)]">
      <div className="container-max">
        {/* ── Section Header: clip + line reveal ────────────── */}
        <div className="text-center mb-10">
          {/* English label: horizontal clip reveal */}
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0)' }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: PREMIUM }}
            className="overflow-hidden inline-block"
          >
            <span className="text-caption text-accent/80">AI SPACE DESIGN</span>
          </motion.div>

          {/* Chinese heading: line slide-up reveal */}
          <div className="mt-3 overflow-hidden">
            <motion.div
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.slow, ease: PREMIUM, delay: 0.1 }}
              className="text-display-md text-text-primary"
            >
              AI 呈现未来您的新家
            </motion.div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <BorderGlow
            edgeSensitivity={28}
            glowColor="3 90 58"
            backgroundColor="#11141b"
            borderRadius={24}
            glowRadius={48}
            glowIntensity={0.9}
            coneSpread={22}
            colors={['#E53935', '#FF6B6B', '#FF8A80']}
            fillOpacity={0.18}
          >
            <div className="relative overflow-hidden rounded-[24px]">
              {/* Image with Ken Burns effect */}
              <div className="w-full overflow-hidden">
                <img
                  src="section-ai-home.jpg"
                  alt="从平面到实景 · 还原理想生活"
                  className="w-full h-auto object-contain carousel-ken-burns"
                  draggable={false}
                  loading="lazy"
                />
              </div>

              {/* Subtle bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#11141b]/60 to-transparent pointer-events-none" />
            </div>
          </BorderGlow>

          {/* Process tags — staggered fade-up */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            {[
              { icon: '①', label: '平面布局' },
              { icon: '②', label: '彩屏平面图' },
              { icon: '③', label: '空间效果图' },
            ].map((step) => (
              <motion.span
                key={step.label}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.97 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: DUR.base, ease: PREMIUM },
                  },
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-surface-border/70 text-text-secondary bg-surface/30 hover:border-accent/30 transition-colors duration-500"
              >
                <span className="text-accent font-bold">{step.icon}</span>
                {step.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
