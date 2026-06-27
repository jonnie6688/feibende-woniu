import { motion } from 'framer-motion';
import { projects } from '@/data/portfolio';
import ProjectCarousel from './ProjectCarousel';
import BorderGlow from './BorderGlow';
import { PREMIUM, DUR, STAG, VIEWPORT } from '@/styles/animations';

/* ── Card entrance variant ────────────────────────────────── */
const cardEntrance = {
  hidden: { opacity: 0, y: 80, scale: 0.96 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: DUR.slow, ease: PREMIUM },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-[var(--space-3xl)]">
      <div className="container-max">
        {/* ── Section Header: clip + line reveal ────────────── */}
        <div className="mb-14">
          {/* English label: horizontal clip reveal */}
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0)' }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: PREMIUM }}
            className="overflow-hidden inline-block"
          >
            <span className="text-caption text-accent/80">SELECTED WORKS</span>
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
              精选项目
            </motion.div>
          </div>
        </div>

        {/* ── Projects Grid (staggered card entrance) ───────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i * STAG}
              variants={cardEntrance}
              className="group"
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="3 90 58"
                backgroundColor="#11141b"
                borderRadius={32}
                glowRadius={48}
                glowIntensity={1.0}
                coneSpread={25}
                colors={['#E53935', '#FF6B6B', '#FF8A80']}
                fillOpacity={0.25}
              >
                <article className="group relative rounded-[2rem] overflow-hidden transition-all duration-500">
                  {/* Image / Video Area */}
                  {project.media && project.media.length > 0 ? (
                    <ProjectCarousel slides={project.media} label={project.category} />
                  ) : (
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface/50 rounded-t-[2rem]">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                          <svg className="w-full h-full opacity-10" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
                            <circle cx="200" cy="125" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
                            <circle cx="200" cy="125" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                            <line x1="80" y1="125" x2="320" y2="125" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                            <line x1="200" y1="45" x2="200" y2="205" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-base-card via-transparent to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-caption text-accent/80">{project.category}</span>
                      {project.media && project.media.length > 1 && (
                        <span className="text-xs text-text-muted font-mono">
                          {project.media.length} 张
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-body text-sm mb-5">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full border border-surface-border/80 text-text-secondary bg-surface/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </BorderGlow>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
