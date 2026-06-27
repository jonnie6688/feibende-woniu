import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import { PREMIUM, DUR, STAG, VIEWPORT } from '@/styles/animations';

export default function ContactFooter() {
  return (
    <section id="contact" className="relative min-h-screen flex items-center">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10 w-full py-[var(--space-3xl)]">
        <div className="max-w-4xl mx-auto text-center">
          {/* ── Section Header: line reveal ─────────────── */}
          <div className="mb-6">
            {/* English label: clip-path reveal */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0 0)' }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.slow, ease: PREMIUM }}
              className="overflow-hidden inline-block"
            >
              <span className="text-caption text-accent/80">CONTACT</span>
            </motion.div>

            {/* Chinese heading: line slide-up reveal */}
            <div className="mt-3 overflow-hidden">
              <motion.div
                initial={{ y: '105%' }}
                whileInView={{ y: '0%' }}
                viewport={VIEWPORT}
                transition={{ duration: DUR.slow, ease: PREMIUM, delay: 0.1 }}
                className="text-display-lg text-text-primary leading-[1.1]"
              >
                一起用 <span className="text-gradient">AI</span>
                <br />
                创造点什么
              </motion.div>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: PREMIUM, delay: 0.2 }}
            className="text-body-lg max-w-xl mx-auto mb-12"
          >
            无论是需要 AI 视觉方案、ComfyUI 工作流搭建，还是想要定制专属模型，都欢迎随时联系。
          </motion.p>

          {/* Action Buttons — staggered */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href={`mailto:${personalInfo.email}`}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: PREMIUM } },
              }}
              className="w-full sm:w-auto px-8 py-4 bg-accent text-base font-semibold rounded-full hover:bg-accent-dim hover:shadow-[0_0_40px_rgba(229,57,53,0.35)] transition-all duration-500"
            >
              发送邮件
            </motion.a>
            <motion.button
              onClick={async (e) => {
                e.preventDefault();
                const text = personalInfo.wechat;
                let ok = false;
                if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                  try {
                    await navigator.clipboard.writeText(text);
                    ok = true;
                  } catch { /* fallback */ }
                }
                if (!ok) {
                  const ta = document.createElement('textarea');
                  ta.value = text;
                  ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
                  document.body.appendChild(ta);
                  ta.select();
                  ok = document.execCommand('copy');
                  document.body.removeChild(ta);
                }
                const btn = e.currentTarget;
                const orig = btn.innerText;
                btn.innerText = ok ? '已复制 ✓' : '复制失败';
                btn.classList.add('!bg-accent/20', '!text-accent');
                setTimeout(() => {
                  btn.innerText = orig;
                  btn.classList.remove('!bg-accent/20', '!text-accent');
                }, 1500);
              }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: PREMIUM } },
              }}
              className="w-full sm:w-auto px-8 py-4 text-text-secondary hover:text-text-primary border border-surface-border/80 rounded-full hover:border-accent/30 transition-all duration-500 hover:bg-surface/30 cursor-pointer select-text"
            >
              复制微信
            </motion.button>
          </motion.div>

          {/* Contact Info Line */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-text-muted text-sm font-mono"
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: PREMIUM } } }}
            >
              {personalInfo.email}
            </motion.span>
            <motion.span
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
              className="hidden sm:inline text-surface-border"
            >
              |
            </motion.span>
            <motion.span
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: PREMIUM } } }}
              className="select-text cursor-text"
              title="点击可选中复制"
              onClick={(e) => {
                const range = document.createRange();
                range.selectNodeContents(e.currentTarget);
                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
              }}
            >
              微信: {personalInfo.wechat}
            </motion.span>
            <motion.span
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
              className="hidden sm:inline text-surface-border"
            >
              |
            </motion.span>
            <motion.span
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: PREMIUM } } }}
            >
              {personalInfo.location}
            </motion.span>
          </motion.div>

          <hr className="divider my-12" />

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: PREMIUM, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <span className="text-caption text-text-muted text-xs">
              © {new Date().getFullYear()} SNAIL.DESIGN
            </span>
            <span className="text-caption text-text-muted text-xs">
              飞奔的蜗牛 — 用 AI 重塑视觉表达
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
