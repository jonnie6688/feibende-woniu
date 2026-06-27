import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Animated number counter - counts up when element enters viewport.
 */
function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  function animateCount() {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(step);
  }

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/**
 * Single stat item with label.
 */
function StatItem({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="text-display-md text-accent font-bold">
        <AnimatedCounter end={value} suffix={suffix} />
      </div>
      <div className="text-caption text-text-muted mt-2 tracking-wider uppercase">
        {label}
      </div>
    </motion.div>
  );
}

/**
 * Site stats bar: visitors, projects, years.
 */
export default function SiteStats({ visitorCount }: { visitorCount: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
    >
      <StatItem value={visitorCount} suffix="+" label="访客" />
      <StatItem value={6} suffix="+" label="精选项目" />
      <StatItem value={3} suffix="+" label="年经验" />
    </motion.div>
  );
}
