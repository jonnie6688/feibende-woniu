import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';
import { PREMIUM, DUR, STAG, VIEWPORT } from '@/styles/animations';

const tools = [
  'ComfyUI', 'Stable Diffusion', 'LoRA', 'ControlNet', 'AnimateDiff', 'Flux', 'Ollama', 'Topaz', 'Photoshop', '剪映'
];

/* ── Card entrance ────────────────────────────────────── */
const cardEntrance = {
  hidden: { opacity: 0, y: 80, scale: 0.96 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: DUR.slow, ease: PREMIUM },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-[var(--space-3xl)]">
      <div className="container-max">

        {/* ── Tools Strip (fade-in on scroll) ─────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={VIEWPORT}
          transition={{ duration: 1, ease: PREMIUM }}
          className="mb-16 overflow-hidden"
        >
          <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-3 py-6 border-y border-surface-border/60 hover:!opacity-100 transition-opacity duration-700">
            {tools.map((tool, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ delay: i * 0.04, duration: 0.6, ease: PREMIUM }}
                className="text-sm font-medium text-text-muted tracking-wide hover:text-accent transition-colors duration-300"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Section Header: clip + line reveal ────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            {/* English label: horizontal clip reveal */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0 0)' }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.slow, ease: PREMIUM }}
              className="overflow-hidden inline-block"
            >
              <span className="text-caption text-accent/80">CORE CAPABILITIES</span>
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
                端到端 AI 视觉能力
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: PREMIUM, delay: 0.2 }}
            className="flex items-end"
          >
            <p className="text-body-lg">
              从概念构思到落地交付，覆盖图像生成、视频创作、工作流搭建与模型训练，
              构建可复用、可规模化的 AI 视觉生产管线。
            </p>
          </motion.div>
        </div>

        {/* ── Skills Grid (staggered card entrance) ─────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              variants={cardEntrance}
              className="group relative p-7 rounded-[2rem] border border-surface-border/80 bg-base-card/40 hover:bg-base-card/70 transition-all duration-500 hover:border-accent/20"
            >
              <div className="flex items-start gap-5 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 text-2xl flex-shrink-0">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-text-primary group-hover:text-accent transition-colors duration-500">
                    {skill.title}
                  </h3>
                  <p className="text-body text-sm mt-2">{skill.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pl-[68px]">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs rounded-full border border-surface-border/80 text-text-secondary bg-surface/20 hover:border-accent/20 hover:text-text-primary transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
