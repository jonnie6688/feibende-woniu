import { useScrollSpy } from '@/hooks/useScrollSpy';

const links = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'projects', label: '项目' },
  { id: 'skills', label: '能力' },
  { id: 'contact', label: '联系' },
];

export default function Navbar() {
  const { active, scrolled } = useScrollSpy(links.map((l) => l.id));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div
        className={`relative mx-auto max-w-[1700px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto ${
          scrolled
            ? 'mt-4 bg-base/60 backdrop-blur-2xl border border-surface-border/80 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-[72px] px-4">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 group"
          >
            <span className="text-accent text-xl font-mono font-medium tracking-tight">
              SN
            </span>
            <span className="hidden sm:inline text-text-secondary text-sm font-mono tracking-wider group-hover:text-text-primary transition-colors duration-300">
              SNAIL.DESIGN
            </span>
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 text-sm font-body transition-colors duration-300 rounded-md ${
                  active === link.id
                    ? 'text-text-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-2.5 text-sm font-semibold text-base bg-accent rounded-full hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(229,57,53,0.35)] transition-all duration-300 hover:scale-[1.02]"
          >
            合作联系
          </button>
        </div>
      </div>
    </nav>
  );
}
